/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import express from 'express'
import { isFunction } from '@pii/utils'

export type ResponseFormatter = ((req: express.Request, result: any, error: any) => any)

export function formatResponse (
  formatters: ResponseFormatter[],
  req: express.Request,
  result: any,
  error?: any
): any {
  (formatters || []).forEach(formatter => {
    if (!isFunction(formatter)) {
      throw new Error(
        `invalid formatter ${(formatter as any).name ||
          (formatter as any).constructor.name ||
          (formatter as any).toString()}`
      )
    }
    result = formatter(req, result, error)
  })
  return result
}
