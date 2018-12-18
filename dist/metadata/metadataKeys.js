"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var MetadataKeys = (function () {
    function MetadataKeys() {
    }
    Object.defineProperty(MetadataKeys, "controller_path", {
        get: function () {
            return 'pii-router-express:controller:path';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MetadataKeys, "controller_name", {
        get: function () {
            return 'pii-router-express:controller:name';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MetadataKeys, "controller_actions", {
        get: function () {
            return 'pii-router-express:controller:actions';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MetadataKeys, "action_render", {
        get: function () {
            return 'pii-router-express:action:render';
        },
        enumerable: true,
        configurable: true
    });
    return MetadataKeys;
}());
exports.MetadataKeys = MetadataKeys;

//# sourceMappingURL=metadataKeys.js.map
