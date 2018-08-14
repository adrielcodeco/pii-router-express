/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'
import { MetadataKeys } from '../metadata'
import { ActionMetadata } from '../metadata/actionMetadata'
import { ActionParamMetadata } from '../metadata/actionParamMetadata'
import { functionArgs } from '@pii/utils'

export function Param (name?: string, acceptHeader: boolean = false) {
  return function (target: any, propertyName: string, index: number) {
    const key = propertyName
    const actions: ActionMetadata[] =
      Reflect.getMetadata(
        MetadataKeys.controller_actions,
        target.constructor
      ) || []
    let action = actions.find(a => a.key === key)
    if (!action) {
      action = new ActionMetadata(key, '', '', 'get')
      actions.push(action)
    }
    const paramName = functionArgs(target[propertyName])[index]
    const paramTypes = Reflect.getMetadata(
      'design:paramtypes',
      target,
      propertyName
    )
    const paramTypeName = paramTypes[index].name
    action.params.push(
      new ActionParamMetadata(
        name || propertyName,
        paramName,
        paramTypeName,
        index,
        acceptHeader
      )
    )
    Reflect.defineMetadata(
      MetadataKeys.controller_actions,
      actions,
      target.constructor
    )
  }
}
