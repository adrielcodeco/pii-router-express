/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

const requireTest = () => {
  return require('../../src/decorators')
}

test('require', () => {
  expect.assertions(7)
  const unit = requireTest()
  expect(unit).toHaveProperty('Controller')
  expect(unit).toHaveProperty('Delete')
  expect(unit).toHaveProperty('Get')
  expect(unit).toHaveProperty('Param')
  expect(unit).toHaveProperty('Post')
  expect(unit).toHaveProperty('Put')
  expect(Object.keys(unit).length).toEqual(6)
})
