"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@pii/di");
const application_1 = require("@pii/application");
const metadata_1 = require("./metadata");
function RequestExtension(req, res, next) {
    res.redirectTo = function (controller) {
        const controllerPath = Reflect.getMetadata(metadata_1.MetadataKeys.controller_path, controller);
        req.redirect(controllerPath);
    };
    next();
}
exports.default = RequestExtension;
di_1.Container.addSingleton(application_1.RequestExtensionToken, RequestExtension);

//# sourceMappingURL=requestExtension.js.map
