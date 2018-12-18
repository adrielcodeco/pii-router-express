"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("../metadata");
var actionMetadata_1 = require("../metadata/actionMetadata");
function Delete(path, name) {
    return function (target, propertyName, descriptor) {
        var method = 'delete';
        var key = propertyName;
        var actions = Reflect.getMetadata(metadata_1.MetadataKeys.controller_actions, target.constructor) || [];
        var action = actions.find(function (a) { return a.key === key; });
        if (action) {
            action.action = name || propertyName;
            action.method = method;
            action.route = path || '/';
        }
        else {
            action = new actionMetadata_1.ActionMetadata(key, path || '/', name || propertyName, method);
            actions.push(action);
        }
        Reflect.defineMetadata(metadata_1.MetadataKeys.controller_actions, actions, target.constructor);
    };
}
exports.Delete = Delete;

//# sourceMappingURL=delete.js.map
