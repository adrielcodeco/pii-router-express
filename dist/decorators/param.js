"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const metadata_1 = require("../metadata");
const actionMetadata_1 = require("../metadata/actionMetadata");
const actionParamMetadata_1 = require("../metadata/actionParamMetadata");
const utils_1 = require("@pii/utils");
function Param(name, acceptHeader = false) {
    return function (target, propertyName, index) {
        const key = propertyName;
        const actions = Reflect.getMetadata(metadata_1.MetadataKeys.controller_actions, target.constructor) || [];
        let action = actions.find(a => a.key === key);
        if (!action) {
            action = new actionMetadata_1.ActionMetadata(key, '', '', 'get');
            actions.push(action);
        }
        const paramName = utils_1.functionArgs(target[propertyName])[index];
        const paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyName);
        const paramTypeName = paramTypes[index].name;
        action.params.push(new actionParamMetadata_1.ActionParamMetadata(name || propertyName, paramName, paramTypeName, index, acceptHeader));
        Reflect.defineMetadata(metadata_1.MetadataKeys.controller_actions, actions, target.constructor);
    };
}
exports.Param = Param;

//# sourceMappingURL=param.js.map
