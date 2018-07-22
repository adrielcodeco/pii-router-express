"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ControllerResolver {
    constructor(controllerFilePath) {
        this.controllerFilePath = controllerFilePath;
    }
    require(className) {
        if (!this.controllerFilePath) {
            throw new Error('controllerFilePath cannot be null');
        }
        const module = require(this.controllerFilePath);
        return module[className];
    }
}
exports.ControllerResolver = ControllerResolver;

//# sourceMappingURL=controllerResolver.js.map
