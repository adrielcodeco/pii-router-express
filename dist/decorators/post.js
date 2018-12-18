"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("../metadata");
var actionMetadata_1 = require("../metadata/actionMetadata");
function Post(pathOrOptions, nameOrOptions) {
    var actionPath = '/';
    var actionOptions;
    if (typeof pathOrOptions === 'object') {
        actionOptions = pathOrOptions;
    }
    else if (pathOrOptions) {
        actionPath = pathOrOptions;
    }
    var name;
    if (typeof nameOrOptions === 'string') {
        name = nameOrOptions;
    }
    else if (nameOrOptions) {
        name = nameOrOptions.name || '';
        actionOptions = nameOrOptions;
    }
    return function (target, propertyName, descriptor) {
        var method = 'post';
        var key = propertyName;
        var actions = Reflect.getMetadata(metadata_1.MetadataKeys.controller_actions, target.constructor) || [];
        var action = actions.find(function (a) { return a.key === key; });
        if (action) {
            action.action = name || propertyName;
            action.method = method;
            action.route = actionPath || '/';
            if (actionOptions) {
                if (actionOptions.render) {
                    action.render = actionOptions.render;
                }
                if (actionOptions.useCSRF) {
                    action.useCSRF = actionOptions.useCSRF;
                }
            }
        }
        else {
            action = new actionMetadata_1.ActionMetadata(key, actionPath || '/', name || propertyName, method);
            if (actionOptions) {
                if (actionOptions.render) {
                    action.render = actionOptions.render;
                }
                if (actionOptions.useCSRF) {
                    action.useCSRF = actionOptions.useCSRF;
                }
            }
            actions.push(action);
        }
        Reflect.defineMetadata(metadata_1.MetadataKeys.controller_actions, actions, target.constructor);
    };
}
exports.Post = Post;

//# sourceMappingURL=post.js.map
