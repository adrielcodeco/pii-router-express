/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'
import express from 'express'
import { MetadataKeys } from './metadataKeys'
import { ActionMetadata } from './actionMetadata'
import { Redirect } from '../rest/redirect'
import { Next } from '../rest/next'
import * as status from '../rest/status'
import { ControllerResolver } from '../controllerResolver'
import { formatResponse } from '../responseFormatter'
import { Container } from '@pii/di'
import scope from '@pii/scope'
import { Is } from '@pii/utils'
const os = require('os')
const csrf = require('csurf')

class RequiredParamError extends Error {}
class InvalidParamError extends Error {}

export class ControllerMetadata {
  public path: string
  public controller: any
  public controllerResolver?: ControllerResolver

  constructor (controller: any) {
    if (!controller) {
      throw new Error('Controller cannot be undefined')
    }
    this.controller = controller
    this.path = Reflect.getMetadata(
      MetadataKeys.controller_path,
      this.controller
    )
  }

  public resolveWith (file: string) {
    this.controllerResolver = new ControllerResolver(file)
  }

  public use (router: express.Router) {
    let _router = router
    if (this.path) {
      _router = express.Router()
      router.use(this.path, _router)
    }
    const actions = this.getActions()
    actions.forEach(action => {
      const args: any[] = [action.route]
      if (action.useCSRF) {
        args.push(csrf())
      }
      if ((action.middlewares || []).length > 0) {
        action.middlewares.forEach(middleware => {
          args.push(middleware)
        })
      }
      args.push(this.requestHandler(action))
      _router[action.method].apply(_router, args)
    })
  }

  private getActions (): ActionMetadata[] {
    return (
      Reflect.getMetadata(MetadataKeys.controller_actions, this.controller) ||
      []
    )
  }

  private requestHandler (action: ActionMetadata) {
    return (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      return Promise.resolve()
        .then(() => {
          let Controller
          if (!this.controllerResolver) {
            Controller = this.controller
          } else {
            const noCacheFor = Container.getServices<string>(
              '(@pii/di/container).filename'
            ).concat(Container.getServices<string>('(@pii/di).filename'))
            const _module = scope.New(
              this.controllerResolver.controllerFilePath,
              {
                noCacheFor
              }
            )
            if (_module.name === this.controller.name) {
              Controller = _module
            } else if (
              _module['default'] &&
              _module['default'].name === this.controller.name
            ) {
              Controller = _module['default']
            } else {
              Controller =
                _module[this.controller.name] ||
                _module['default'][this.controller.name]
            }
          }
          return new Controller()
        })
        .then(ctrl => {
          let params
          try {
            params = this.resolveParams(action, req, res)
          } catch (err) {
            if (err instanceof RequiredParamError) {
              return Promise.reject(err)
            }
          }
          return ctrl[action.action].apply(ctrl, params)
        })
        .then((result: any) => {
          if (result instanceof status.StatusCode) {
            res.status(result.status)
          }
          if (result instanceof Redirect) {
            res.redirect(result.path)
          } else if (result instanceof Next) {
            next(result.err)
          } else if (action.render) {
            res.render(
              action.render,
              formatResponse((req as any).formatters, req, result)
            )
          } else if (action.method === 'get' || result) {
            res.json(formatResponse((req as any).formatters, req, result))
          } else {
            res.status(200).end()
          }
        })
        .catch((err: any) => {
          if (
            err instanceof RequiredParamError ||
            err instanceof InvalidParamError
          ) {
            res.status(status.UnprocessableEntity().status)
          } else if (err instanceof status.StatusCode) {
            res.status(err.status)
          }
          if (err instanceof Next) {
            next(err.err)
          } else if (action.render) {
            next(formatResponse((req as any).formatters, req, null, err))
          } else if (action.method === 'get' || err) {
            res.json(formatResponse((req as any).formatters, req, null, err))
          } else {
            next(err)
          }
          return err
        })
    }
  }

  private resolveParams (
    action: ActionMetadata,
    req: express.Request,
    res: express.Response
  ): any[] {
    const actionParams = action.params || []
    const params: any[] = []
    actionParams.forEach(paramMetadata => {
      let param
      let key = paramMetadata.key
      if (key === '_req') {
        param = req
      } else if (key === '_res') {
        param = res
      } else if (req.body && Reflect.has(req.body, key)) {
        param = req.body[key]
      } else if (req.query && Reflect.has(req.query, key)) {
        param = req.query[key]
      } else if (req.params && Reflect.has(req.params, key)) {
        param = req.params[key]
      }
      if (paramMetadata.required && Is.isNullOrUndefined(param)) {
        throw new RequiredParamError(`Required param: ${key}`)
      }
      if (paramMetadata.validation) {
        const validationResult = paramMetadata.validation(param, req)
        if (validationResult) {
          let errorMessage = `Invalid param: ${key}${os.EOL}`
          errorMessage += validationResult
          throw new InvalidParamError(errorMessage)
        }
      }
      params[paramMetadata.index] = param
    })
    return params
  }
}
