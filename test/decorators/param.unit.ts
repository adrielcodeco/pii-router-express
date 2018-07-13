/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'

export {}

const requireTest = () => {
  return require('../../src/decorators/param')
}

test('require', () => {
  expect.assertions(2)
  const unit = requireTest()
  expect(unit).toHaveProperty('Param')
  expect(Object.keys(unit).length).toEqual(1)
})

test('use Param without arguments', () => {
  expect.assertions(1)
  const Param = requireTest().Param
  const Get = require('../../src/decorators/get').Get
  const { Metadata } = require('../../src/metadata')
  class Test {
    @Get('/home', 'goHome')
    getMethod (@Param() param1Test: number, @Param() param2Test: string) {
      // does nothing
    }
  }
  const action = Reflect.getMetadata(Metadata.controller_actions, Test)
  expect(action).toEqual([
    {
      action: 'goHome',
      key: 'getMethod',
      method: 'get',
      params: [
        { index: 1, key: 'getMethod', name: 'param2Test', type: 'String' },
        { index: 0, key: 'getMethod', name: 'param1Test', type: 'Number' }
      ],
      route: '/home'
    }
  ])
})

test('use Param', () => {
  expect.assertions(1)
  const Param = requireTest().Param
  const Get = require('../../src/decorators/get').Get
  const { Metadata } = require('../../src/metadata')
  class Test {
    @Get('/home', 'goHome')
    getMethod (
      @Param('param1-name') param1Test: any,
      @Param('param2-name') param2Test: string
    ) {
      // does nothing
    }
  }
  const action = Reflect.getMetadata(Metadata.controller_actions, Test)
  expect(action).toEqual([
    {
      action: 'goHome',
      key: 'getMethod',
      method: 'get',
      params: [
        { index: 1, key: 'param2-name', name: 'param2Test', type: 'String' },
        { index: 0, key: 'param1-name', name: 'param1Test', type: 'Object' }
      ],
      route: '/home'
    }
  ])
})
