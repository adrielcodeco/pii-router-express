/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

const requireTest = () => {
  return require('../../src/metadata/metadata')
}

test('require', () => {
  expect.assertions(2)
  const unit = requireTest()
  expect(unit).toHaveProperty('Metadata')
  expect(Object.keys(unit).length).toEqual(1)
})

test('check properties', () => {
  expect.assertions(3)
  const unit = requireTest()
  expect(unit.Metadata.controller_path).toEqual(
    'pii-router-express:controller:path'
  )
  expect(unit.Metadata.controller_name).toEqual(
    'pii-router-express:controller:name'
  )
  expect(unit.Metadata.controller_actions).toEqual(
    'pii-router-express:controller:actions'
  )
})

test('call get without arguments', () => {
  expect.assertions(1)
  const unit = requireTest()
  expect(() => {
    unit.Metadata.get()
  }).toThrowError(/Controller cannot be undefined/)
})

test('call get', () => {
  expect.assertions(1)
  const unit = requireTest()
  const {
    ControllerMetadata
  } = require('../../src/metadata/controllerMetadata')
  expect(unit.Metadata.get({})).toBeInstanceOf(ControllerMetadata)
})
