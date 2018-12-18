/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Methods } from '../methods'
import { ActionParamMetadata } from './actionParamMetadata'

export class ActionMetadata {
  public render?: string
  public useCSRF?: boolean
  public params: ActionParamMetadata[]
  public middlewares: Function[]
  constructor (
    public key: string,
    public route: string,
    public action: string,
    public method: Methods
  ) {
    this.params = []
    this.middlewares = []
  }
}
