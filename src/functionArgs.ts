/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function getArgs (args: string) {
  // Split the arguments string into an array comma delimited.
  return args
    .split(',')
    .map(function (arg) {
      // Ensure no inline comments are parsed and trim the whitespace.
      return arg.replace(/\/\*.*\*\//, '').trim()
    })
    .filter(function (arg) {
      // Ensure no undefined values are added.
      return arg
    })
}

function matchArrowFunction (func: Function) {
  const matchResult = func.toString().match(/\(([^)]*)\)\s?=>\s?/)
  if (!matchResult || matchResult.length !== 2) {
    throw new Error('invalid function')
  }
  const args = matchResult[1]
  return getArgs(args)
}

function matchFunction (func: Function) {
  const matchResult = func.toString().match(/.*?\(([^)]*)\)\s?{/)
  if (!matchResult || matchResult.length !== 2) {
    return matchArrowFunction(func)
  }
  const args = matchResult[1]
  return getArgs(args)
}

export default function functionArgs (func: Function) {
  return matchFunction(func)
}
