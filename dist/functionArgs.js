"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getArgs(args) {
    return args
        .split(',')
        .map(function (arg) {
        return arg.replace(/\/\*.*\*\//, '').trim();
    })
        .filter(function (arg) {
        return arg;
    });
}
function matchArrowFunction(func) {
    const matchResult = func.toString().match(/\(([^)]*)\)\s?=>\s?/);
    if (!matchResult || matchResult.length !== 2) {
        throw new Error('invalid function');
    }
    const args = matchResult[1];
    return getArgs(args);
}
function matchFunction(func) {
    const matchResult = func.toString().match(/.*?\(([^)]*)\)\s?{/);
    if (!matchResult || matchResult.length !== 2) {
        return matchArrowFunction(func);
    }
    const args = matchResult[1];
    return getArgs(args);
}
function functionArgs(func) {
    return matchFunction(func);
}
exports.default = functionArgs;

//# sourceMappingURL=functionArgs.js.map
