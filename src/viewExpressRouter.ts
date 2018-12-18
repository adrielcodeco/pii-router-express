/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'reflect-metadata'
import express from 'express'
import { ResponseFormatter } from './responseFormatter'
import { AbstractExpressRouter } from './abstractExpressRouter'

export class ViewExpressRouter extends AbstractExpressRouter {
  public responseFormatters: ResponseFormatter[] = [this.apiResponseFormat]

  constructor (public path: string = '/') {
    super(path)
  }

  private apiResponseFormat (req: express.Request, result: any, error?: any): any {
    if (error instanceof Error) {
      error = {
        message: error.message,
        stack: error.stack
      }
    }
    return error ? error : result
  }
}
