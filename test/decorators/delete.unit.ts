/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'

export {}

const requireTest = () => {
  return require('../../src/decorators/delete')
}

test('require', () => {
  expect.assertions(2)
  const unit = requireTest()
  expect(unit).toHaveProperty('Delete')
  expect(Object.keys(unit).length).toEqual(1)
})

describe('use Delete without arguments', () => {
  test('without Param', () => {
    expect.assertions(1)
    const Delete = requireTest().Delete
    const { Metadata } = require('../../src/metadata')
    class Test {
      @Delete()
      deleteMethod () {
        // does nothing
      }
    }
    const action = Reflect.getMetadata(Metadata.controller_actions, Test)
    expect(action).toEqual([
      {
        action: 'deleteMethod',
        key: 'deleteMethod',
        method: 'delete',
        params: [],
        route: '/'
      }
    ])
  })

  test('with Param', () => {
    expect.assertions(1)
    const Delete = requireTest().Delete
    const Param = require('../../src/decorators/param').Param
    const { Metadata } = require('../../src/metadata')
    class Test {
      @Delete()
      deleteMethod (@Param() paramTest: number) {
        // does nothing
      }
    }
    const action = Reflect.getMetadata(Metadata.controller_actions, Test)
    expect(action).toEqual([
      {
        action: 'deleteMethod',
        key: 'deleteMethod',
        method: 'delete',
        params: [
          { index: 0, key: 'deleteMethod', name: 'paramTest', type: 'Number' }
        ],
        route: '/'
      }
    ])
  })
})

describe('use Delete', () => {
  test('without param', () => {
    expect.assertions(1)
    const Delete = requireTest().Delete
    const { Metadata } = require('../../src/metadata')
    class Test {
      @Delete('/path-test', 'name-test')
      deleteMethod () {
        // does nothing
      }
    }
    const action = Reflect.getMetadata(Metadata.controller_actions, Test)
    expect(action).toEqual([
      {
        action: 'name-test',
        key: 'deleteMethod',
        method: 'delete',
        params: [],
        route: '/path-test'
      }
    ])
  })

  test('with param', () => {
    expect.assertions(1)
    const Delete = requireTest().Delete
    const Param = require('../../src/decorators/param').Param
    const { Metadata } = require('../../src/metadata')
    class Test {
      @Delete('/path-test', 'name-test')
      deleteMethod (@Param() paramTest: any) {
        // does nothing
      }
    }
    const action = Reflect.getMetadata(Metadata.controller_actions, Test)
    expect(action).toEqual([
      {
        action: 'name-test',
        key: 'deleteMethod',
        method: 'delete',
        params: [
          { index: 0, key: 'deleteMethod', name: 'paramTest', type: 'Object' }
        ],
        route: '/path-test'
      }
    ])
  })
})
