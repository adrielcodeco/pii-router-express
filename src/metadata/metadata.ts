/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'
import { ControllerMetadata } from './controllerMetadata'

export class Metadata {
  public static get controller_path () {
    return 'pii-router-express:controller:path'
  }

  public static get controller_name () {
    return 'pii-router-express:controller:name'
  }

  public static get controller_actions () {
    return 'pii-router-express:controller:actions'
  }

  public static get (controller: object): ControllerMetadata {
    return new ControllerMetadata(controller)
  }
}
