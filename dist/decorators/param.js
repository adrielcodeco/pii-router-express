'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
require('reflect-metadata')
const metadata_1 = require('../metadata')
const actionMetadata_1 = require('../metadata/actionMetadata')
const actionParamMetadata_1 = require('../metadata/actionParamMetadata')
const functionArgs_1 = require('../functionArgs')
function Param (name) {
  return function (target, propertyName, index) {
    const key = propertyName
    const actions =
      Reflect.getMetadata(
        metadata_1.Metadata.controller_actions,
        target.constructor
      ) || []
    let action = actions.find(a => a.key === key)
    if (!action) {
      action = new actionMetadata_1.ActionMetadata(key, '', '', 'get')
      actions.push(action)
    }
    const paramName = functionArgs_1.default(target[propertyName])[index]
    const paramTypes = Reflect.getMetadata(
      'design:paramtypes',
      target,
      propertyName
    )
    const paramTypeName = paramTypes[index].name
    action.params.push(
      new actionParamMetadata_1.ActionParamMetadata(
        name || propertyName,
        paramName,
        paramTypeName,
        index
      )
    )
    Reflect.defineMetadata(
      metadata_1.Metadata.controller_actions,
      actions,
      target.constructor
    )
  }
}
exports.Param = Param

//# sourceMappingURL=param.js.map