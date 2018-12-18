/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MetadataKeys } from '../metadata'
import { ActionMetadata } from '../metadata/actionMetadata'

export type PostDecoratorOptions = {
  name?: string;
  render?: string;
  useCSRF?: boolean;
}

// tslint:disable unified-signatures
export function Post (): Function
export function Post (path: string): Function
export function Post (options: PostDecoratorOptions): Function
export function Post (path: string, name: string): Function
export function Post (path: string, options: PostDecoratorOptions): Function
// tslint:enable unified-signatures
export function Post (
  pathOrOptions?: string | PostDecoratorOptions,
  nameOrOptions?: string | PostDecoratorOptions
) {
  let actionPath: string = '/'
  let actionOptions: PostDecoratorOptions
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
    const method = 'post'
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
      if (actionOptions) {
        if (actionOptions.render) {
          action.render = actionOptions.render
        }
        if (actionOptions.useCSRF) {
          action.useCSRF = actionOptions.useCSRF
        }
      }
    } else {
      action = new ActionMetadata(
        key,
        actionPath || '/',
        name || propertyName,
        method
      )
      if (actionOptions) {
        if (actionOptions.render) {
          action.render = actionOptions.render
        }
        if (actionOptions.useCSRF) {
          action.useCSRF = actionOptions.useCSRF
        }
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
