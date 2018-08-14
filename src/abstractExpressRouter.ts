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
import { ExpressRouter } from '@pii/server-express'
import { Container } from '@pii/di'
import { resolvePath } from '@pii/moduleloader'
import { isClass } from '@pii/utils'
import { ResponseFormatter } from './responseFormatter'
import { Metadata } from './metadata/metadata'
import { MetadataKeys } from './metadata/metadataKeys'
import { ControllerMetadata } from './metadata/controllerMetadata'
import { ControllerToken } from './controllerToken'

export abstract class AbstractExpressRouter extends ExpressRouter {
  protected controllers: any[] = []
  protected router: express.Router

  abstract responseFormatters: ResponseFormatter[]

  constructor (public path: string = '/') {
    super()
    this.router = express.Router()
    this.router.use(this.requestHandler.bind(this))
  }

  public add (controllerModule: any | any[]): void {
    if (!controllerModule) throw new Error('invalid controller')
    if (controllerModule instanceof Array) {
      controllerModule.forEach(m => this.add(m))
      return undefined
    }
    const isController =
      (typeof controllerModule === 'object' ||
        typeof controllerModule === 'function') &&
      isClass(controllerModule) &&
      Reflect.hasMetadata(MetadataKeys.controller_name, controllerModule)
    if (isController) {
      const meta = Metadata.get(controllerModule)
      Container.addSingleton(ControllerToken, meta, false)
    } else {
      try {
        const controllers = Reflect.ownKeys(controllerModule)
        controllers.forEach(key => {
          const controller = controllerModule[key]
          const isController =
            (typeof controller === 'object' ||
              typeof controller === 'function') &&
            isClass(controller) &&
            Reflect.hasMetadata(MetadataKeys.controller_name, controller)
          if (isController) {
            const meta = Metadata.get(controller)
            Container.addSingleton(ControllerToken, meta, false)
          }
        })
      } catch (err) {
        // does nothing
      }
    }
  }

  public addFromFolder (directory: string): void {
    directory = resolvePath(directory)
    if (!directory || !fs.lstatSync(directory).isDirectory()) {
      throw new Error('invalid directory')
    }
    const files = glob.sync('**/*.[tj]s', { cwd: directory })
    files.forEach(file => {
      const filePath = path.resolve(directory, file)
      const mod = require(filePath)
      this.add(mod)
    })
  }

  public resolveController (file: string): void {
    file = resolvePath(file)
    if (!file) throw new Error('invalid file')
    const filePath = path.isAbsolute(file)
      ? file
      : path.resolve(process.cwd(), file)
    const controllerModule = require(filePath)
    const isController =
      (typeof controllerModule === 'object' ||
        typeof controllerModule === 'function') &&
        isClass(controllerModule) &&
      Reflect.hasMetadata(MetadataKeys.controller_name, controllerModule)
    if (isController) {
      const meta = Metadata.get(controllerModule)
      meta.resolveWith(filePath)
      Container.addSingleton(ControllerToken, meta, false)
    } else {
      try {
        const controllers = Reflect.ownKeys(controllerModule)
        controllers.forEach(key => {
          const controller = controllerModule[key]
          const isController =
            (typeof controller === 'object' ||
              typeof controller === 'function') &&
              isClass(controller) &&
            Reflect.hasMetadata(MetadataKeys.controller_name, controller)
          if (isController) {
            const meta = Metadata.get(controller)
            meta.resolveWith(filePath)
            Container.addSingleton(ControllerToken, meta, false)
          }
        })
      } catch (err) {
        // does nothing
      }
    }
  }

  public resolveControllers (directory: string): void {
    directory = resolvePath(directory)
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
    req && Reflect.set(req, 'formatters', this.responseFormatters)
    next && next()
  }
}
