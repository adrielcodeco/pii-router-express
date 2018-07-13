/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

const requireTest = () => {
  return require('../src/controllerResolver')
}

test('require', () => {
  expect.assertions(2)
  const unit = requireTest()
  expect(unit).toHaveProperty('ControllerResolver')
  expect(Object.keys(unit).length).toEqual(1)
})

describe('new', () => {
  test('without arguments', () => {
    expect.assertions(1)
    const unit = requireTest()
    expect(() => {
      // tslint:disable-next-line: no-unused-expression
      new unit.ControllerResolver()
    }).not.toThrow()
  })

  test('with controllerFilePath', () => {
    expect.assertions(2)
    const unit = requireTest()
    let controllerResolver = { controllerFilePath: '' }
    expect(() => {
      // tslint:disable-next-line: no-unused-expression
      controllerResolver = new unit.ControllerResolver('controllerFilePathTest')
    }).not.toThrow()
    expect(controllerResolver.controllerFilePath).toEqual(
      'controllerFilePathTest'
    )
  })
})

describe('call require without arguments', () => {
  test('without controllerFilePath', () => {
    expect.assertions(1)
    const unit = requireTest()
    const controllerResolver = new unit.ControllerResolver()
    expect(() => {
      controllerResolver.require()
    }).toThrowError(/controllerFilePath cannot be null/)
  })

  test('with invalid controllerFilePath', () => {
    expect.assertions(1)
    const unit = requireTest()
    const controllerResolver = new unit.ControllerResolver(
      'controllerFilePathTest'
    )
    expect(() => {
      controllerResolver.require()
    }).toThrowError(/Cannot find module 'controllerFilePathTest' from/)
  })

  test('with valid controllerFilePath', () => {
    expect.assertions(1)
    const unit = requireTest()
    const controllerResolver = new unit.ControllerResolver(
      require.resolve('./dummy/simpleJs')
    )
    expect(() => {
      controllerResolver.require()
    }).not.toThrow()
  })
})
