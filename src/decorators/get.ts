/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MetadataKeys } from '../metadata'
import { ActionMetadata } from '../metadata/actionMetadata'

export type GetDecoratorOptions = {
  name?: string
  render?: string
}

// tslint:disable unified-signatures
export function Get (): Function
export function Get (path: string): Function
export function Get (options: GetDecoratorOptions): Function
export function Get (path: string, name: string): Function
export function Get (path: string, options: GetDecoratorOptions): Function
// tslint:enable unified-signatures
export function Get (
  pathOrOptions?: string | GetDecoratorOptions,
  nameOrOptions?: string | GetDecoratorOptions
): Function {
  let actionPath: string = '/'
  let actionOptions: GetDecoratorOptions
  if (typeof pathOrOptions === 'object') {
    actionOptions = pathOrOptions
  } else if (pathOrOptions) {
    actionPath = pathOrOptions
  }
  let name: string
  if (typeof nameOrOptions === 'string') {
    name = nameOrOptions
  } else if (nameOrOptions) {
    name = nameOrOptions.name || ''
    actionOptions = nameOrOptions
  }
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    const method = 'get'
    const key = propertyName
    const actions: ActionMetadata[] =
      Reflect.getMetadata(
        MetadataKeys.controller_actions,
        target.constructor
      ) || []
    let action = actions.find(a => a.key === key)
    if (action) {
      action.action = name || propertyName
      action.method = method
      action.route = actionPath || '/'
      if (actionOptions && actionOptions.render) {
        action.render = actionOptions.render
      }
    } else {
      action = new ActionMetadata(
        key,
        actionPath || '/',
        name || propertyName,
        method
      )
      if (actionOptions && actionOptions.render) {
        action.render = actionOptions.render
      }
      actions.push(action)
    }
    Reflect.defineMetadata(
      MetadataKeys.controller_actions,
      actions,
      target.constructor
    )
  }
}
