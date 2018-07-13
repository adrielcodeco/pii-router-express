/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'

export {}

const requireTest = () => {
  return require('../../src/decorators/get')
}

test('require', () => {
  expect.assertions(2)
  const unit = requireTest()
  expect(unit).toHaveProperty('Get')
  expect(Object.keys(unit).length).toEqual(1)
})

describe('use Get without arguments', () => {
  test('without Param', () => {
    expect.assertions(1)
    const Get = requireTest().Get
    const { Metadata } = require('../../src/metadata')
    class Test {
      @Get()
      getMethod () {
        // does nothing
      }
    }
    const action = Reflect.getMetadata(Metadata.controller_actions, Test)
    expect(action).toEqual([
      {
        action: 'getMethod',
        key: 'getMethod',
        method: 'get',
        params: [],
        route: '/'
      }
    ])
  })

  test('with Param', () => {
    expect.assertions(1)
    const Get = requireTest().Get
    const Param = require('../../src/decorators/param').Param
    const { Metadata } = require('../../src/metadata')
    class Test {
      @Get()
      getMethod (@Param() paramTest: number) {
        // does nothing
      }
    }
    const action = Reflect.getMetadata(Metadata.controller_actions, Test)
    expect(action).toEqual([
      {
        action: 'getMethod',
        key: 'getMethod',
        method: 'get',
        params: [{ index: 0, key: 'getMethod', name: 'paramTest', type: 'Number' }],
        route: '/'
      }
    ])
  })
})

describe('use Get', () => {
  test('without param', () => {
    expect.assertions(1)
    const Get = requireTest().Get
    const { Metadata } = require('../../src/metadata')
    class Test {
      @Get('/path-test', 'name-test')
      getMethod () {
        // does nothing
      }
    }
    const action = Reflect.getMetadata(Metadata.controller_actions, Test)
    expect(action).toEqual([
      {
        action: 'name-test',
        key: 'getMethod',
        method: 'get',
        params: [],
        route: '/path-test'
      }
    ])
  })

  test('with param', () => {
    expect.assertions(1)
    const Get = requireTest().Get
    const Param = require('../../src/decorators/param').Param
    const { Metadata } = require('../../src/metadata')
    class Test {
      @Get('/path-test', 'name-test')
      getMethod (@Param() paramTest: any) {
        // does nothing
      }
    }
    const action = Reflect.getMetadata(Metadata.controller_actions, Test)
    expect(action).toEqual([
      {
        action: 'name-test',
        key: 'getMethod',
        method: 'get',
        params: [{ index: 0, key: 'getMethod', name: 'paramTest', type: 'Object' }],
        route: '/path-test'
      }
    ])
  })
})
