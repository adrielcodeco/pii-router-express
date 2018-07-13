/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export class ControllerResolver {
  constructor (public readonly controllerFilePath: string) {}

  public require (className: string) {
    if (!this.controllerFilePath) {
      throw new Error('controllerFilePath cannot be null')
    }
    const module = require(this.controllerFilePath)
    return module[className]
  }
}
