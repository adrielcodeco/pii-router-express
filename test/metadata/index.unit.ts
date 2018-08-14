/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

const requireTest = () => {
  return require('../../src/metadata')
}

test('require', () => {
  expect.assertions(3)
  const unit = requireTest()
  expect(unit).toHaveProperty('Metadata')
  expect(unit).toHaveProperty('MetadataKeys')
  expect(Object.keys(unit).length).toEqual(2)
})
