/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import express from 'express'

export class ActionParamMetadata {
  public required?: boolean
  public validation?: (value: any, req: express.Request) => string
  public acceptHeader: boolean = false
  constructor (
    public key: string,
    public name: string,
    public type: string,
    public index: number
  ) {}
}
