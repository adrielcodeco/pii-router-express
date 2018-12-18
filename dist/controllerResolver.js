"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ControllerResolver = (function () {
    function ControllerResolver(controllerFilePath) {
        this.controllerFilePath = controllerFilePath;
    }
    ControllerResolver.prototype.require = function (className) {
        if (!this.controllerFilePath) {
            throw new Error('controllerFilePath cannot be null');
        }
        var module = require(this.controllerFilePath);
        return module[className];
    };
    return ControllerResolver;
}());
exports.ControllerResolver = ControllerResolver;

//# sourceMappingURL=controllerResolver.js.map
