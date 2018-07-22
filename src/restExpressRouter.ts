/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'
import * as express from 'express'
import * as path from 'path'
import * as fs from 'fs'
import * as glob from 'glob'
import { ControllerToken } from '@pii/application'
import { ExpressRouter } from '@pii/server-express'
import { Container } from '@pii/di'
import { Metadata } from './metadata/metadata'
import { MetadataKeys } from './metadata/metadataKeys'
import { ControllerMetadata } from './metadata/controllerMetadata'

export class RESTExpressRouter extends ExpressRouter {
  private controllers: any[] = []
  private router: express.Router

  constructor (public path: string = '/') {
    super()
    this.router = express.Router()
    this.router.use(this.requestHandler)
  }

  public add (controllerModule: any) {
    if (!controllerModule) throw new Error('invalid controller')
    const isController =
      (typeof controllerModule === 'object' ||
        typeof controllerModule === 'function') &&
      !!(controllerModule.prototype || {}).constructor &&
      Reflect.hasMetadata(MetadataKeys.controller_name, controllerModule)
    if (isController) {
      const meta = Metadata.get(controllerModule)
      Container.addTransient(ControllerToken, meta)
    } else {
      try {
        const controllers = Reflect.ownKeys(controllerModule)
        controllers.forEach(key => {
          const controller = controllerModule[key]
          const isController =
            (typeof controller === 'object' ||
              typeof controller === 'function') &&
            !!controller.prototype.constructor &&
            Reflect.hasMetadata(MetadataKeys.controller_name, controller)
          if (isController) {
            const meta = Metadata.get(controller)
            Container.addTransient(ControllerToken, meta)
          }
        })
      } catch (err) {
        // does nothing
      }
    }
  }

  public resolveController (file: string) {
    if (!file) throw new Error('invalid file')
    const filePath = path.isAbsolute(file)
      ? file
      : path.resolve(process.cwd(), file)
    const controllerModule = require(filePath)
    const isController =
      (typeof controllerModule === 'object' ||
        typeof controllerModule === 'function') &&
      !!(controllerModule.prototype || {}).constructor &&
      Reflect.hasMetadata(MetadataKeys.controller_name, controllerModule)
    if (isController) {
      const meta = Metadata.get(controllerModule)
      meta.resolveWith(filePath)
      Container.addTransient(ControllerToken, meta)
    } else {
      try {
        const controllers = Reflect.ownKeys(controllerModule)
        controllers.forEach(key => {
          const controller = controllerModule[key]
          const isController =
            (typeof controller === 'object' ||
              typeof controller === 'function') &&
            !!controller.prototype.constructor &&
            Reflect.hasMetadata(MetadataKeys.controller_name, controller)
          if (isController) {
            const meta = Metadata.get(controller)
            meta.resolveWith(filePath)
            Container.addTransient(ControllerToken, meta)
          }
        })
      } catch (err) {
        // does nothing
      }
    }
  }

  public resolveControllers (directory: string) {
    if (!directory || !fs.lstatSync(directory).isDirectory()) {
      throw new Error('invalid directory')
    }
    const files = glob.sync('**/*.[tj]s', { cwd: directory })
    files.forEach(file => {
      const filePath = path.resolve(directory, file)
      this.resolveController(filePath)
    })
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
