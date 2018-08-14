/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'
import * as express from 'express'
import { MetadataKeys } from './metadataKeys'
import { ActionMetadata } from './actionMetadata'
import { ControllerResolver } from '../controllerResolver'
import { formatResponse } from '../responseFormatter'
import scope from '@pii/scope'

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
      const args = [action.route, this.requestHandler(action)]
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
      let Controller
      if (!this.controllerResolver) {
        Controller = this.controller
      } else {
        const _module = scope.New(this.controllerResolver.controllerFilePath, {
          noCacheFor: ['@pii/di', '@pii/di/dist/container']
        })
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
      const ctrl = new Controller()
      const params = this.resolveParams(action, req)
      const actionResult = ctrl[action.action].apply(ctrl, params)
      return Promise.resolve(actionResult)
        .then((result: any) => {
          if (action.render) {
            res.render(
              action.render,
              formatResponse((req as any).formatters, req, result)
            )
          } else {
            res.json(formatResponse((req as any).formatters, req, result))
          }
        })
        .catch((err: any) => {
          if (action.render) {
            next(formatResponse((req as any).formatters, req, null, err))
          } else {
            res.json(formatResponse((req as any).formatters, req, null, err))
          }
        })
    }
  }

  private resolveParams (action: ActionMetadata, req: express.Request): any[] {
    let paramsLength = 0
    const actionParams = action.params || []
    actionParams.forEach(param => {
      if (param.index >= paramsLength) {
        paramsLength = param.index + 1
      }
    })
    const params = new Array(paramsLength)
    actionParams.forEach(paramMetadata => {
      let param
      if (req.body && req.body[paramMetadata.name]) {
        param = req.body[paramMetadata.name]
      } else if (req.query && req.query[paramMetadata.name]) {
        param = req.query[paramMetadata.name]
      }
      params[paramMetadata.index] = param
    })
    return params
  }
}
