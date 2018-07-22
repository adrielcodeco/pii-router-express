/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'
import { Container } from '@pii/di'
import { ControllerToken } from '@pii/application'
import { Metadata, MetadataKeys } from '../metadata'

export type ControllerDecorationOptions = {
  name?: string
  inject?: boolean
  scoped?: string
}

export function Controller (
  path?: string,
  options?: string | ControllerDecorationOptions
): Function {
  let name: string
  if (typeof options === 'string') {
    name = options
  } else {
    name = (options || ({} as any)).name
  }
  return function (target: any) {
    if (!name) {
      name = target.name
    }
    Reflect.defineMetadata(MetadataKeys.controller_name, name, target)
    Reflect.defineMetadata(MetadataKeys.controller_path, path || '/', target)
    if (typeof options === 'object') {
      if (options.inject) {
        const meta = Metadata.get(target)
        if (options.scoped) {
          meta.resolveWith(options.scoped)
        }
        Container.addTransient(ControllerToken, meta)
      }
    }
  }
}
