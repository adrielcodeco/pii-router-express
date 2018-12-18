/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class Redirect {
  constructor (public path: string) {}
  resolve () {
    return Promise.resolve(this)
  }
  reject () {
    return Promise.reject(this)
  }
}

export function redirect (path: string): Redirect {
  return new Redirect(path)
}
