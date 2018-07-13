/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export class ActionParamMetadata {
  constructor (
    public key: string,
    public name: string,
    public type: string,
    public index: number
  ) {}
}
