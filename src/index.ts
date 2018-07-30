/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as glob from 'glob'
import * as path from 'path'
import * as fs from 'fs'
import { ExpressRouterToken } from '@pii/server-express'
import { Container } from '@pii/di'
import { RESTExpressRouter } from './restExpressRouter'
import { ViewExpressRouter } from './viewExpressRouter'

export * from './decorators'
export * from './controllerResolver'
export * from './restExpressRouter'
export * from './viewExpressRouter'

export function defaultRestRouterFrom (controllersDir: string) {
  if (!controllersDir) {
    throw new Error('invalid directory')
  }
  if (!path.isAbsolute(controllersDir)) {
    controllersDir = path.resolve(process.cwd(), controllersDir)
  }
  if (!fs.lstatSync(controllersDir).isDirectory()) {
    throw new Error('invalid directory')
  }
  const router = new RESTExpressRouter()
  Container.addTransient(ExpressRouterToken, router)
  const files = glob.sync('**/*.[tj]s', { cwd: controllersDir })
  files.forEach(file => {
    const filePath = path.resolve(controllersDir, file)
    require(filePath)
  })
}

export function defaultViewRouterFrom (controllersDir: string) {
  if (!controllersDir) {
    throw new Error('invalid directory')
  }
  if (!path.isAbsolute(controllersDir)) {
    controllersDir = path.resolve(process.cwd(), controllersDir)
  }
  if (!fs.lstatSync(controllersDir).isDirectory()) {
    throw new Error('invalid directory')
  }
  const router = new ViewExpressRouter()
  Container.addTransient(ExpressRouterToken, router)
  const files = glob.sync('**/*.[tj]s', { cwd: controllersDir })
  files.forEach(file => {
    const filePath = path.resolve(controllersDir, file)
    require(filePath)
  })
}
