/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'

export {}

const requireTest = () => {
  return require('../../src/decorators/controller')
}

test('require', () => {
  expect.assertions(2)
  const unit = requireTest()
  expect(unit).toHaveProperty('Controller')
  expect(Object.keys(unit).length).toEqual(1)
})

test('use Controller without arguments', () => {
  expect.assertions(2)
  const Controller = requireTest().Controller
  const { Metadata } = require('../../src/metadata')
  @Controller()
  class Test {}
  const metaName = Reflect.getMetadata(Metadata.controller_name, Test)
  expect(metaName).toEqual('Test')
  const metaPath = Reflect.getMetadata(Metadata.controller_path, Test)
  expect(metaPath).toEqual('/')
})

test('use Controller', () => {
  expect.assertions(2)
  const Controller = requireTest().Controller
  const { Metadata } = require('../../src/metadata')
  @Controller('/path-test', 'name-test')
  class Test {}
  const metaName = Reflect.getMetadata(Metadata.controller_name, Test)
  expect(metaName).toEqual('name-test')
  const metaPath = Reflect.getMetadata(Metadata.controller_path, Test)
  expect(metaPath).toEqual('/path-test')
})
