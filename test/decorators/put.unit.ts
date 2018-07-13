/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'

export {}

const requireTest = () => {
  return require('../../src/decorators/put')
}

test('require', () => {
  expect.assertions(2)
  const unit = requireTest()
  expect(unit).toHaveProperty('Put')
  expect(Object.keys(unit).length).toEqual(1)
})

describe('use Put without arguments', () => {
  test('without Param', () => {
    expect.assertions(1)
    const Put = requireTest().Put
    const { Metadata } = require('../../src/metadata')
    class Test {
      @Put()
      putMethod () {
        // does nothing
      }
    }
    const action = Reflect.getMetadata(Metadata.controller_actions, Test)
    expect(action).toEqual([
      {
        action: 'putMethod',
        key: 'putMethod',
        method: 'put',
        params: [],
        route: '/'
      }
    ])
  })

  test('with Param', () => {
    expect.assertions(1)
    const Put = requireTest().Put
    const Param = require('../../src/decorators/param').Param
    const { Metadata } = require('../../src/metadata')
    class Test {
      @Put()
      putMethod (@Param() paramTest: number) {
        // does nothing
      }
    }
    const action = Reflect.getMetadata(Metadata.controller_actions, Test)
    expect(action).toEqual([
      {
        action: 'putMethod',
        key: 'putMethod',
        method: 'put',
        params: [
          { index: 0, key: 'putMethod', name: 'paramTest', type: 'Number' }
        ],
        route: '/'
      }
    ])
  })
})

describe('use Put', () => {
  test('without param', () => {
    expect.assertions(1)
    const Put = requireTest().Put
    const { Metadata } = require('../../src/metadata')
    class Test {
      @Put('/path-test', 'name-test')
      putMethod () {
        // does nothing
      }
    }
    const action = Reflect.getMetadata(Metadata.controller_actions, Test)
    expect(action).toEqual([
      {
        action: 'name-test',
        key: 'putMethod',
        method: 'put',
        params: [],
        route: '/path-test'
      }
    ])
  })

  test('with param', () => {
    expect.assertions(1)
    const Put = requireTest().Put
    const Param = require('../../src/decorators/param').Param
    const { Metadata } = require('../../src/metadata')
    class Test {
      @Put('/path-test', 'name-test')
      putMethod (@Param() paramTest: any) {
        // does nothing
      }
    }
    const action = Reflect.getMetadata(Metadata.controller_actions, Test)
    expect(action).toEqual([
      {
        action: 'name-test',
        key: 'putMethod',
        method: 'put',
        params: [
          { index: 0, key: 'putMethod', name: 'paramTest', type: 'Object' }
        ],
        route: '/path-test'
      }
    ])
  })
})
