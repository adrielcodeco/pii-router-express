/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'
import { Metadata } from '../metadata'

export function Controller (path?: string, name?: string) {
  return function (target: any) {
    if (!name) name = target.name
    Reflect.defineMetadata(Metadata.controller_name, name, target)
    Reflect.defineMetadata(Metadata.controller_path, path || '/', target)
  }
}
