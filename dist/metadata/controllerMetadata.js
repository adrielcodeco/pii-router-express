"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const metadataKeys_1 = require("./metadataKeys");
const controllerResolver_1 = require("../controllerResolver");
const scope_1 = require("@pii/scope");
class ControllerMetadata {
    constructor(controller) {
        if (!controller) {
            throw new Error('Controller cannot be undefined');
        }
        this.controller = controller;
        this.path = Reflect.getMetadata(metadataKeys_1.MetadataKeys.controller_path, this.controller);
    }
    resolveWith(file) {
        this.controllerResolver = new controllerResolver_1.ControllerResolver(file);
    }
    use(router) {
        let _router = router;
        if (this.path) {
            _router = express.Router();
            router.use(this.path, _router);
        }
        const actions = this.getActions();
        actions.forEach(action => {
            const args = [action.route, this.requestHandler(action)];
            _router[action.method].apply(_router, args);
        });
    }
    getActions() {
        return (Reflect.getMetadata(metadataKeys_1.MetadataKeys.controller_actions, this.controller) || []);
    }
    requestHandler(action) {
        return (req, res, next) => {
            let Controller;
            if (!this.controllerResolver) {
                Controller = this.controller;
            }
            else {
                const _module = scope_1.default.New(this.controllerResolver.controllerFilePath, {
                    noCacheFor: ['@pii/di', '@pii/di/dist/container']
                });
                if (_module.name === this.controller.name) {
                    Controller = _module;
                }
                else if (_module['default'] &&
                    _module['default'].name === this.controller.name) {
                    Controller = _module['default'];
                }
                else {
                    Controller =
                        _module[this.controller.name] ||
                            _module['default'][this.controller.name];
                }
            }
            const ctrl = new Controller();
            const result = ctrl[action.action].apply(ctrl, []);
            if (action.render) {
                res.render(action.render, result);
            }
            else {
                res.json(result);
            }
        };
    }
}
exports.ControllerMetadata = ControllerMetadata;

//# sourceMappingURL=controllerMetadata.js.map
