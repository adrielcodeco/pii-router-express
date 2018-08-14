"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("../metadata");
const actionMetadata_1 = require("../metadata/actionMetadata");
function Get(pathOrOptions, nameOrOptions) {
    let actionPath = '/';
    let actionOptions;
    if (typeof pathOrOptions === 'object') {
        actionOptions = pathOrOptions;
    }
    else if (pathOrOptions) {
        actionPath = pathOrOptions;
    }
    let name;
    if (typeof nameOrOptions === 'string') {
        name = nameOrOptions;
    }
    else if (nameOrOptions) {
        name = nameOrOptions.name || '';
        actionOptions = nameOrOptions;
    }
    return function (target, propertyName, descriptor) {
        const method = 'get';
        const key = propertyName;
        const actions = Reflect.getMetadata(metadata_1.MetadataKeys.controller_actions, target.constructor) || [];
        let action = actions.find(a => a.key === key);
        if (action) {
            action.action = name || propertyName;
            action.method = method;
            action.route = actionPath || '/';
            if (actionOptions && actionOptions.render) {
                action.render = actionOptions.render;
            }
        }
        else {
            action = new actionMetadata_1.ActionMetadata(key, actionPath || '/', name || propertyName, method);
            if (actionOptions && actionOptions.render) {
                action.render = actionOptions.render;
            }
            actions.push(action);
        }
        Reflect.defineMetadata(metadata_1.MetadataKeys.controller_actions, actions, target.constructor);
    };
}
exports.Get = Get;

//# sourceMappingURL=get.js.map
