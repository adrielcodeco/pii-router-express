/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

const requireTest = () => {
  return require('../src')
}

test('require', () => {
  expect.assertions(20)
  const unit = requireTest()
  expect(unit).toHaveProperty('Controller')
  expect(unit).toHaveProperty('ControllerResolver')
  expect(unit).toHaveProperty('Delete')
  expect(unit).toHaveProperty('Get')
  expect(unit).toHaveProperty('Param')
  expect(unit).toHaveProperty('Post')
  expect(unit).toHaveProperty('Put')
  expect(unit).toHaveProperty('RESTExpressRouter')
  expect(unit).toHaveProperty('ViewExpressRouter')
  expect(unit).toHaveProperty('Next')
  expect(unit).toHaveProperty('next')
  expect(unit).toHaveProperty('Redirect')
  expect(unit).toHaveProperty('redirect')
  expect(unit).toHaveProperty('SendFile')
  expect(unit).toHaveProperty('sendFile')
  expect(unit).toHaveProperty('status')
  expect(unit).toHaveProperty('ActionMiddleware')
  expect(unit).toHaveProperty('defaultRestRouterFrom')
  expect(unit).toHaveProperty('defaultViewRouterFrom')
  expect(Object.keys(unit).length).toEqual(19)
})
