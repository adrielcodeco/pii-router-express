'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled (value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected (value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step (result) {
        result.done
          ? resolve(result.value)
          : new P(function (resolve) {
            resolve(result.value)
          }).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
Object.defineProperty(exports, '__esModule', { value: true })
require('reflect-metadata')
const express = require('express')
const path = require('path')
const server_express_1 = require('@pii/server-express')
const di_1 = require('@pii/di')
const metadata_1 = require('./metadata/metadata')
const controllerMetadata_1 = require('./metadata/controllerMetadata')
exports.ControllerToken = di_1.Token('EXPRESS_CONTROLLER_TOKEN')
class MVCExpressRouter extends server_express_1.ExpressRouter {
  constructor (path = '/') {
    super()
    this.path = path
    this.controllers = []
    this.router = express.Router()
    this.router.use(this.requestHandler)
  }
  resolveController (file) {
    const filePath = path.isAbsolute(file)
      ? file
      : path.resolve(process.cwd(), file)
    const controllerModule = require(filePath)
    const isController =
      (typeof controllerModule === 'object' ||
        typeof controllerModule === 'function') &&
      !!(controllerModule.prototype || {}).constructor &&
      Reflect.hasMetadata(metadata_1.Metadata.controller_name, controllerModule)
    if (isController) {
      const meta = metadata_1.Metadata.get(controllerModule)
      meta.resolveWith(filePath)
      di_1.Container.addSingleton(exports.ControllerToken, meta)
    } else {
      try {
        const controllers = Reflect.ownKeys(controllerModule)
        controllers.forEach(key => {
          const controller = controllerModule[key]
          const isController =
            (typeof controller === 'object' ||
              typeof controller === 'function') &&
            !!controller.prototype.constructor &&
            Reflect.hasMetadata(metadata_1.Metadata.controller_name, controller)
          if (isController) {
            const meta = metadata_1.Metadata.get(controller)
            meta.resolveWith(filePath)
            di_1.Container.addSingleton(exports.ControllerToken, meta)
          }
        })
      } catch (err) {}
    }
  }
  init (server) {
    return __awaiter(this, void 0, void 0, function * () {
      if (!server) throw new Error('server cannot be null')
      this.controllers = di_1.Container.getServices(exports.ControllerToken)
      this.controllers.forEach(controller => {
        if (controller instanceof controllerMetadata_1.ControllerMetadata) {
          controller.use(this.router)
        } else {
          metadata_1.Metadata.get(controller).use(this.router)
        }
      })
      server.use(this.path, this.router)
    })
  }
  requestHandler (req, res, next) {
    next && next()
  }
}
exports.MVCExpressRouter = MVCExpressRouter

//# sourceMappingURL=mvcExpressRouter.js.map
