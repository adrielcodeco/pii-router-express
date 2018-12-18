"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("./metadata");
var actionMetadata_1 = require("./metadata/actionMetadata");
var ActionMiddleware = (function () {
    function ActionMiddleware() {
    }
    ActionMiddleware.addMiddleware = function (target, propertyName, descriptor, middleware) {
        var key = propertyName;
        var actions = Reflect.getMetadata(metadata_1.MetadataKeys.controller_actions, target.constructor) || [];
        var action = actions.find(function (a) { return a.key === key; });
        if (action) {
            if (!action.middlewares) {
                action.middlewares = [];
            }
            action.middlewares.push(middleware);
        }
        else {
            action = new actionMetadata_1.ActionMetadata(key, '/', propertyName, 'get');
            action.middlewares = [middleware];
            actions.push(action);
        }
        Reflect.defineMetadata(metadata_1.MetadataKeys.controller_actions, actions, target.constructor);
    };
    return ActionMiddleware;
}());
exports.ActionMiddleware = ActionMiddleware;

//# sourceMappingURL=actionMiddleware.js.map
