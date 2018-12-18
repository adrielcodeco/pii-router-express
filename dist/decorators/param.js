"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var metadata_1 = require("../metadata");
var actionMetadata_1 = require("../metadata/actionMetadata");
var actionParamMetadata_1 = require("../metadata/actionParamMetadata");
var utils_1 = require("@pii/utils");
function Param(nameOrOptions, options) {
    var name;
    if (typeof nameOrOptions === 'string') {
        name = nameOrOptions;
    }
    else if (typeof nameOrOptions === 'object' && !options) {
        options = nameOrOptions;
    }
    return function (target, propertyName, index) {
        var key = propertyName;
        var actions = Reflect.getMetadata(metadata_1.MetadataKeys.controller_actions, target.constructor) || [];
        var action = actions.find(function (a) { return a.key === key; });
        if (!action) {
            action = new actionMetadata_1.ActionMetadata(key, '', '', 'get');
            actions.push(action);
        }
        var paramName = utils_1.functionArgs(target[propertyName])[index];
        var paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyName);
        var paramTypeName = paramTypes[index].name;
        var actionParam = new actionParamMetadata_1.ActionParamMetadata(name || paramName, paramName, paramTypeName, index);
        if (options) {
            actionParam.acceptHeader = !!options.acceptHeader;
            actionParam.required = options.required;
            actionParam.validation = options.validation;
        }
        action.params.push(actionParam);
        Reflect.defineMetadata(metadata_1.MetadataKeys.controller_actions, actions, target.constructor);
    };
}
exports.Param = Param;

//# sourceMappingURL=param.js.map
