/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'

export {}

const requireTest = () => {
  return require('../../src/decorators/post')
}

test('require', () => {
  expect.assertions(2)
  const unit = requireTest()
  expect(unit).toHaveProperty('Post')
  expect(Object.keys(unit).length).toEqual(1)
})

describe('use Post without arguments', () => {
  test('without Param', () => {
    expect.assertions(1)
    const Post = requireTest().Post
    const { MetadataKeys } = require('../../src/metadata')
    class Test {
      @Post()
      postMethod () {
        // does nothing
      }
    }
    const action = Reflect.getMetadata(MetadataKeys.controller_actions, Test)
    expect(action).toEqual([
      {
        action: 'postMethod',
        key: 'postMethod',
        method: 'post',
        middlewares: [],
        params: [],
        route: '/'
      }
    ])
  })

  test('with Param', () => {
    expect.assertions(1)
    const Post = requireTest().Post
    const Param = require('../../src/decorators/param').Param
    const { MetadataKeys } = require('../../src/metadata')
    class Test {
      @Post()
      postMethod (@Param() paramTest: number) {
        // does nothing
      }
    }
    const action = Reflect.getMetadata(MetadataKeys.controller_actions, Test)
    expect(action).toEqual([
      {
        action: 'postMethod',
        key: 'postMethod',
        method: 'post',
        middlewares: [],
        params: [
          {
            acceptHeader: false,
            index: 0,
            key: 'paramTest',
            name: 'paramTest',
            type: 'Number'
          }
        ],
        route: '/'
      }
    ])
  })
})

describe('use Post', () => {
  test('without param', () => {
    expect.assertions(1)
    const Post = requireTest().Post
    const { MetadataKeys } = require('../../src/metadata')
    class Test {
      @Post('/path-test', 'name-test')
      postMethod () {
        // does nothing
      }
    }
    const action = Reflect.getMetadata(MetadataKeys.controller_actions, Test)
    expect(action).toEqual([
      {
        action: 'name-test',
        key: 'postMethod',
        method: 'post',
        middlewares: [],
        params: [],
        route: '/path-test'
      }
    ])
  })

  test('with param', () => {
    expect.assertions(1)
    const Post = requireTest().Post
    const Param = require('../../src/decorators/param').Param
    const { MetadataKeys } = require('../../src/metadata')
    class Test {
      @Post('/path-test', 'name-test')
      postMethod (@Param() paramTest: any) {
        // does nothing
      }
    }
    const action = Reflect.getMetadata(MetadataKeys.controller_actions, Test)
    expect(action).toEqual([
      {
        action: 'name-test',
        key: 'postMethod',
        method: 'post',
        middlewares: [],
        params: [
          {
            acceptHeader: false,
            index: 0,
            key: 'paramTest',
            name: 'paramTest',
            type: 'Object'
          }
        ],
        route: '/path-test'
      }
    ])
  })
})
