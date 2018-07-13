'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
require('reflect-metadata')
const controllerMetadata_1 = require('./controllerMetadata')
class Metadata {
  static get controller_path () {
    return 'pii-router-express:controller:path'
  }
  static get controller_name () {
    return 'pii-router-express:controller:name'
  }
  static get controller_actions () {
    return 'pii-router-express:controller:actions'
  }
  static get (controller) {
    return new controllerMetadata_1.ControllerMetadata(controller)
  }
}
exports.Metadata = Metadata

//# sourceMappingURL=metadata.js.map
