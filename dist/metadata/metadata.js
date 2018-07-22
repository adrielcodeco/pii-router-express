"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const controllerMetadata_1 = require("./controllerMetadata");
class Metadata {
    static get(controller) {
        return new controllerMetadata_1.ControllerMetadata(controller);
    }
}
exports.Metadata = Metadata;

//# sourceMappingURL=metadata.js.map
