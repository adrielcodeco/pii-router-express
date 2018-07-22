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
    this.path = Reflect.getMetadata(MetadataKeys.controller_path, this.controller)
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
      Reflect.getMetadata(MetadataKeys.controller_actions, this.controller) || []
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
      const result = ctrl[action.action].apply(ctrl, [])
      if (action.render) {
        res.render(action.render, result)
      } else {
        res.json(result)
      }
    }
  }
}
