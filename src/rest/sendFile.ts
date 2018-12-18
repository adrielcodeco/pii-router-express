/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class SendFile {
  constructor (public contentType: string, public file: Buffer) {}
  promise () {
    return Promise.resolve(this)
  }
}

export function sendFile (contentType: string, file: Buffer): SendFile {
  return new SendFile(contentType, file)
}
