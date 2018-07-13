/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

const requireTest = () => {
  return require('../src/functionArgs').default
}

describe('call functionArgs', () => {
  test('with invalid function', () => {
    expect.assertions(1)
    const unit = requireTest()
    expect(() => {
      unit({})
    }).toThrowError(/invalid function/)
  })

  test('without arguments', () => {
    expect.assertions(1)
    const unit = requireTest()
    const func = function () {
      // does nothing
    }
    const result = unit(func)
    expect(result).toEqual([])
  })

  test('with function unnamed', () => {
    expect.assertions(1)
    const unit = requireTest()
    const func = function (arg1: any, arg2: any, arg3: any, arg4: any) {
      // does nothing
    }
    const result = unit(func)
    expect(result).toEqual(['arg1', 'arg2', 'arg3', 'arg4'])
  })

  test('with function named', () => {
    expect.assertions(1)
    const unit = requireTest()
    const func = function Func1 (arg1: any, arg2: any, arg3: any, arg4: any) {
      // does nothing
    }
    const result = unit(func)
    expect(result).toEqual(['arg1', 'arg2', 'arg3', 'arg4'])
  })

  test('with arrow function', () => {
    expect.assertions(1)
    const unit = requireTest()
    const func = (arg1: any, arg2: any, arg3: any, arg4: any) => {
      // does nothing
    }
    const result = unit(func)
    expect(result).toEqual(['arg1', 'arg2', 'arg3', 'arg4'])
  })
})
