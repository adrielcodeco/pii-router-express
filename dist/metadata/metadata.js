"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var controllerMetadata_1 = require("./controllerMetadata");
var Metadata = (function () {
    function Metadata() {
    }
    Metadata.get = function (controller) {
        return new controllerMetadata_1.ControllerMetadata(controller);
    };
    return Metadata;
}());
exports.Metadata = Metadata;

//# sourceMappingURL=metadata.js.map
