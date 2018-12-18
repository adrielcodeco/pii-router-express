/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

const requireTest = () => {
  return require('../../src/metadata/controllerMetadata')
}

beforeAll(() => {
  jest.mock('express', () => {
    return {
      Router: function () {
        return {
          get: () => ({})
        }
      }
    }
  })
  jest.mock('@pii/scope', () => {
    return {
      New: (path: any) => {
        return require(path)
      }
    }
  })
})

afterAll(() => {
  jest.unmock('express')
  jest.unmock('@pii/scope')
})

test('require', () => {
  expect.assertions(2)
  const unit = requireTest()
  expect(unit).toHaveProperty('ControllerMetadata')
  expect(Object.keys(unit).length).toEqual(1)
})

test('new without arguments', () => {
  expect.assertions(1)
  const unit = requireTest()
  expect(() => {
    // tslint:disable-next-line: no-unused-expression
    new unit.ControllerMetadata()
  }).toThrowError(/Controller cannot be undefined/)
})

test('new', () => {
  expect.assertions(2)
  const unit = requireTest()
  const { Controller } = require('../../src/decorators/controller')
  @Controller()
  class Test {}
  let cm = { path: '' }
  expect(() => {
    // tslint:disable-next-line: no-unused-expression
    cm = new unit.ControllerMetadata(Test)
  }).not.toThrow()
  expect(cm.path).toEqual('/')
})

test('call resolveWith', () => {
  expect.assertions(1)
  const unit = requireTest()
  const { Controller } = require('../../src/decorators/controller')
  const { ControllerResolver } = require('../../src/controllerResolver')
  @Controller()
  class Test {}
  let cm = new unit.ControllerMetadata(Test)
  cm.resolveWith()
  expect(cm.controllerResolver).toBeInstanceOf(ControllerResolver)
})

test('call use with ControllerMetadata.path', () => {
  expect.assertions(1)
  const unit = requireTest()
  const { Controller } = require('../../src/decorators/controller')
  @Controller()
  class Test {}
  let cm = new unit.ControllerMetadata(Test)
  const useFn = jest.fn()
  cm.use({ use: useFn })
  expect(useFn).toBeCalled()
})

test('call use without ControllerMetadata.path', () => {
  expect.assertions(1)
  const unit = requireTest()
  class Test {}
  let cm = new unit.ControllerMetadata(Test)
  const useFn = jest.fn()
  cm.use({ use: useFn })
  expect(useFn).not.toBeCalled()
})

test('call use with ControllerMetadata.path', () => {
  expect.assertions(2)
  const unit = requireTest()
  const { Controller } = require('../../src/decorators/controller')
  const { Get } = require('../../src/decorators/get')
  @Controller()
  class Test {
    @Get()
    getMthod () {
      // does nothing
    }
  }
  let cm = new unit.ControllerMetadata(Test)
  cm.requestHandler = jest.fn()
  const useFn = jest.fn()
  cm.use({ use: useFn })
  expect(cm.requestHandler).toBeCalled()
  expect(useFn).toBeCalled()
})

test('call getActions', () => {
  expect.assertions(2)
  const unit = requireTest()
  const { Controller } = require('../../src/decorators/controller')
  const { Get } = require('../../src/decorators/get')
  @Controller()
  class Test {
    @Get()
    getMthod () {
      // does nothing
    }
  }
  let cm = new unit.ControllerMetadata(Test)
  const actions = cm.getActions()
  expect(actions.length).toEqual(1)
  expect(actions[0]).toEqual({
    action: 'getMthod',
    key: 'getMthod',
    method: 'get',
    middlewares: [],
    params: [],
    route: '/'
  })
})

test('call requestHandler', async () => {
  expect.assertions(2)
  const unit = requireTest()
  const { Controller } = require('../../src/decorators/controller')
  const { Get } = require('../../src/decorators/get')
  @Controller()
  class Test {
    @Get()
    getMthod () {
      // does nothing
    }
  }
  let cm = new unit.ControllerMetadata(Test)
  const action = cm.requestHandler({
    action: 'getMthod',
    key: 'getMthod',
    method: 'get',
    params: [],
    middlewares: [],
    route: '/'
  })
  const jsonFn = jest.fn()
  await expect(
    action({}, { json: jsonFn }, () => ({}))
  ).resolves.toBeUndefined()
  expect(jsonFn).toBeCalled()
})

describe('call requestHandler using this.controllerResolver', () => {
  test('for module.exports', async () => {
    expect.assertions(2)
    const unit = requireTest()
    const TestController = require('../dummy/classController')
    let cm = new unit.ControllerMetadata(TestController)
    cm.resolveWith(require.resolve('../dummy/classController'))
    const action = cm.requestHandler({
      action: 'Home',
      key: 'Home',
      method: 'get',
      params: [],
      middlewares: [],
      route: '/'
    })
    const jsonFn = jest.fn()
    await expect(
      action({}, { json: jsonFn }, () => ({}))
    ).resolves.toBeUndefined()
    expect(jsonFn).toBeCalled()
  })

  test('for export', async () => {
    expect.assertions(2)
    const unit = requireTest()
    const TestController = require('../dummy/exportClassController')
      .TestController
    let cm = new unit.ControllerMetadata(TestController)
    cm.resolveWith(require.resolve('../dummy/exportClassController'))
    const action = cm.requestHandler({
      action: 'Home',
      key: 'Home',
      method: 'get',
      params: [],
      middlewares: [],
      route: '/'
    })
    const jsonFn = jest.fn()
    await expect(
      action({}, { json: jsonFn }, () => ({}))
    ).resolves.toBeUndefined()
    expect(jsonFn).toBeCalled()
  })

  test('for export default', async () => {
    expect.assertions(2)
    const unit = requireTest()
    const TestController = require('../dummy/defaultClassController').default
    let cm = new unit.ControllerMetadata(TestController)
    cm.resolveWith(require.resolve('../dummy/defaultClassController'))
    const action = cm.requestHandler({
      action: 'Home',
      key: 'Home',
      method: 'get',
      params: [],
      middlewares: [],
      route: '/'
    })
    const jsonFn = jest.fn()
    await expect(
      action({}, { json: jsonFn }, () => ({}))
    ).resolves.toBeUndefined()
    expect(jsonFn).toBeCalled()
  })

  test('for export default {}', async () => {
    expect.assertions(2)
    const unit = requireTest()
    const TestController = require('../dummy/exportObjectContainingClassController')
      .default.TestController
    let cm = new unit.ControllerMetadata(TestController)
    cm.resolveWith(
      require.resolve('../dummy/exportObjectContainingClassController')
    )
    const action = cm.requestHandler({
      action: 'Home',
      key: 'Home',
      method: 'get',
      params: [],
      middlewares: [],
      route: '/'
    })
    const jsonFn = jest.fn()
    await expect(
      action({}, { json: jsonFn }, () => ({}))
    ).resolves.toBeUndefined()
    expect(jsonFn).toBeCalled()
  })
})
