/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'
import { Metadata } from '../metadata'
import { ActionMetadata } from '../metadata/actionMetadata'
import { ActionParamMetadata } from '../metadata/actionParamMetadata'
import functionArgs from '../functionArgs'

export function Param (name?: string) {
  return function (target: any, propertyName: string, index: number) {
    const key = propertyName
    const actions: ActionMetadata[] =
      Reflect.getMetadata(Metadata.controller_actions, target.constructor) || []
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
        index
      )
    )
    Reflect.defineMetadata(
      Metadata.controller_actions,
      actions,
      target.constructor
    )
  }
}
