/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'reflect-metadata'
import * as express from 'express'
import { ResponseFormatter } from './responseFormatter'
import { AbstractExpressRouter } from './abstractExpressRouter'

export class RESTExpressRouter extends AbstractExpressRouter {

  public responseFormatters: ResponseFormatter[] = [this.apiResponseFormat]

  constructor (public path: string = '/api') {
    super(path)
  }

  private apiResponseFormat (req: express.Request, result: any, error?: any): any {
    const res: any = {
      success: !error
    }
    if (error) {
      res.error = error
    } else {
      res.data = result
    }
    return res
  }
}
