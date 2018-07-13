/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'
import * as express from 'express'
import * as path from 'path'
import { ExpressRouter } from '@pii/server-express'
import { Container, Token } from '@pii/di'
import { Metadata } from './metadata/metadata'
import { ControllerMetadata } from './metadata/controllerMetadata'

export const ControllerToken = Token('EXPRESS_CONTROLLER_TOKEN')

export class MVCExpressRouter extends ExpressRouter {
  private controllers: any[] = []
  private router: express.Router

  constructor (public path: string = '/') {
    super()
    this.router = express.Router()
    this.router.use(this.requestHandler)
  }

  public resolveController (file: string) {
    const filePath = path.isAbsolute(file)
      ? file
      : path.resolve(process.cwd(), file)
    const controllerModule = require(filePath)
    const isController =
      (typeof controllerModule === 'object' ||
        typeof controllerModule === 'function') &&
      !!(controllerModule.prototype || {}).constructor &&
      Reflect.hasMetadata(Metadata.controller_name, controllerModule)
    if (isController) {
      const meta = Metadata.get(controllerModule)
      meta.resolveWith(filePath)
      Container.addSingleton(ControllerToken, meta)
    } else {
      try {
        const controllers = Reflect.ownKeys(controllerModule)
        controllers.forEach(key => {
          const controller = controllerModule[key]
          const isController =
            (typeof controller === 'object' ||
              typeof controller === 'function') &&
            !!controller.prototype.constructor &&
            Reflect.hasMetadata(Metadata.controller_name, controller)
          if (isController) {
            const meta = Metadata.get(controller)
            meta.resolveWith(filePath)
            Container.addSingleton(ControllerToken, meta)
          }
        })
      } catch (err) {
        // does nothing
      }
    }
  }

  public async init (server: express.Express): Promise<void> {
    if (!server) throw new Error('server cannot be null')
    this.controllers = Container.getServices(ControllerToken)
    this.controllers.forEach(controller => {
      if (controller instanceof ControllerMetadata) {
        controller.use(this.router)
      } else {
        Metadata.get(controller).use(this.router)
      }
    })
    server.use(this.path, this.router)
  }

  private requestHandler (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    next && next()
  }
}
