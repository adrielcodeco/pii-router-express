/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'reflect-metadata'
import { ResponseFormatter } from './responseFormatter'
import { AbstractExpressRouter } from './abstractExpressRouter'

export class ViewExpressRouter extends AbstractExpressRouter {
  public responseFormatters: ResponseFormatter[] = []

  constructor (public path: string = '/') {
    super(path)
  }
}
