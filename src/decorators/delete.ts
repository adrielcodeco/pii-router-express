/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Metadata } from '../metadata'
import { ActionMetadata } from '../metadata/actionMetadata'

export function Delete (path?: string, name?: string) {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    const method = 'delete'
    const key = propertyName
    const actions: ActionMetadata[] =
      Reflect.getMetadata(Metadata.controller_actions, target.constructor) || []
    let action = actions.find(a => a.key === key)
    if (action) {
      action.action = name || propertyName
      action.method = method
      action.route = path || '/'
    } else {
      action = new ActionMetadata(
        key,
        path || '/',
        name || propertyName,
        method
      )
      actions.push(action)
    }
    Reflect.defineMetadata(
      Metadata.controller_actions,
      actions,
      target.constructor
    )
  }
}
