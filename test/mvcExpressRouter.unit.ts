/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

const requireTest = () => {
  return require('../src/mvcExpressRouter')
}

test('require', () => {
  expect.assertions(1)
  expect(() => {
    requireTest()
  }).not.toThrow()
})

test('new', () => {
  expect.assertions(2)
  const unit = requireTest()
  let router = { router: undefined }
  expect(() => {
    router = new unit.MVCExpressRouter()
  }).not.toThrow()
  expect(router.router).toBeDefined()
})

test('call resolveController without arguments', () => {
  expect.assertions(1)
  const unit = requireTest()
  let router = new unit.MVCExpressRouter()
  expect(() => {
    router.resolveController('')
  }).not.toThrow()
})

test('call resolveController with absolute file', () => {
  expect.assertions(1)
  const unit = requireTest()
  let router = new unit.MVCExpressRouter()
  expect(() => {
    router.resolveController(require.resolve('./dummy/classController'))
    router.resolveController(require.resolve('./dummy/defaultClassController'))
  }).not.toThrow()
})

test('call init without arguments', async () => {
  expect.assertions(1)
  const unit = requireTest()
  let router = new unit.MVCExpressRouter()
  return expect(router.init()).rejects.toEqual(
    new Error('server cannot be null')
  )
})

test('call init', async () => {
  expect.assertions(2)
  const unit = requireTest()
  const { Container } = require('@pii/di')
  let router = new unit.MVCExpressRouter()
  const classController = require('./dummy/classController')
  Container.addTransient(unit.ControllerToken, classController)
  const useFn = jest.fn()
  await expect(router.init({ use: useFn })).resolves.toBeUndefined()
  expect(useFn).toBeCalled()
})

test('call requestHandler without arguments', async () => {
  expect.assertions(1)
  const unit = requireTest()
  let router = new unit.MVCExpressRouter()
  expect(() => {
    // @ts-ignore
    router.requestHandler()
  }).not.toThrow()
})

test('call requestHandler', async () => {
  expect.assertions(1)
  const unit = requireTest()
  let router = new unit.MVCExpressRouter()
  const nextFn = jest.fn()
  router.requestHandler(null, null, nextFn)
  expect(nextFn).toBeCalled()
})
