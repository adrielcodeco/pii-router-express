/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'
import express from 'express'
import { MetadataKeys } from '../metadata'
import { ActionMetadata } from '../metadata/actionMetadata'
import { ActionParamMetadata } from '../metadata/actionParamMetadata'
import { functionArgs } from '@pii/utils'

export type ParamOptions = {
  acceptHeader?: boolean;
  required?: boolean;
  validation?: (value: any, req: express.Request) => string;
}

// tslint:disable unified-signatures
export function Param (): Function
export function Param (name: string): Function
export function Param (options: ParamOptions): Function
// tslint:enable unified-signatures
export function Param (
  nameOrOptions?: string | ParamOptions,
  options?: ParamOptions
): Function {
  let name: string
  if (typeof nameOrOptions === 'string') {
    name = nameOrOptions
  } else if (typeof nameOrOptions === 'object' && !options) {
    options = nameOrOptions
  }
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
    const actionParam = new ActionParamMetadata(
      name || paramName,
      paramName,
      paramTypeName,
      index
    )
    if (options) {
      actionParam.acceptHeader = !!options.acceptHeader
      actionParam.required = options.required
      actionParam.validation = options.validation
    }
    action.params.push(actionParam)
    Reflect.defineMetadata(
      MetadataKeys.controller_actions,
      actions,
      target.constructor
    )
  }
}
