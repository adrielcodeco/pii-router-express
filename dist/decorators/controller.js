'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
require('reflect-metadata')
const metadata_1 = require('../metadata')
function Controller (path, name) {
  return function (target) {
    if (!name) name = target.name
    Reflect.defineMetadata(metadata_1.Metadata.controller_name, name, target)
    Reflect.defineMetadata(
      metadata_1.Metadata.controller_path,
      path || '/',
      target
    )
  }
}
exports.Controller = Controller

//# sourceMappingURL=controller.js.map
