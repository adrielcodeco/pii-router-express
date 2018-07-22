"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const di_1 = require("@pii/di");
const application_1 = require("@pii/application");
const metadata_1 = require("../metadata");
function Controller(path, options) {
    let name;
    if (typeof options === 'string') {
        name = options;
    }
    else {
        name = (options || {}).name;
    }
    return function (target) {
        if (!name) {
            name = target.name;
        }
        Reflect.defineMetadata(metadata_1.MetadataKeys.controller_name, name, target);
        Reflect.defineMetadata(metadata_1.MetadataKeys.controller_path, path || '/', target);
        if (typeof options === 'object') {
            if (options.inject) {
                const meta = metadata_1.Metadata.get(target);
                if (options.scoped) {
                    meta.resolveWith(options.scoped);
                }
                di_1.Container.addTransient(application_1.ControllerToken, meta);
            }
        }
    };
}
exports.Controller = Controller;

//# sourceMappingURL=controller.js.map
