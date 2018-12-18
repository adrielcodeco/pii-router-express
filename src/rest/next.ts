/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class Next {
  constructor (public err?: any) {}
  resolve () {
    return Promise.resolve(this)
  }
  reject () {
    return Promise.reject(this)
  }
}

export function next (err?: any): Next {
  return new Next(err)
}
