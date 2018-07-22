"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("../metadata");
const actionMetadata_1 = require("../metadata/actionMetadata");
function Delete(path, name) {
    return function (target, propertyName, descriptor) {
        const method = 'delete';
        const key = propertyName;
        const actions = Reflect.getMetadata(metadata_1.MetadataKeys.controller_actions, target.constructor) || [];
        let action = actions.find(a => a.key === key);
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
