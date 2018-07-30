"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const metadataKeys_1 = require("./metadataKeys");
const controllerResolver_1 = require("../controllerResolver");
const responseFormatter_1 = require("../responseFormatter");
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
        return (Reflect.getMetadata(metadataKeys_1.MetadataKeys.controller_actions, this.controller) ||
            []);
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
            const params = this.resolveParams(action, req);
            const actionResult = ctrl[action.action].apply(ctrl, params);
            Promise.resolve(actionResult)
                .then((result) => {
                if (action.render) {
                    res.render(action.render, responseFormatter_1.formatResponse(req.formatters, req, result));
                }
                else {
                    res.json(responseFormatter_1.formatResponse(req.formatters, req, result));
                }
            })
                .catch((err) => {
                if (action.render) {
                    next(responseFormatter_1.formatResponse(req.formatters, req, null, err));
                }
                else {
                    res.json(responseFormatter_1.formatResponse(req.formatters, req, null, err));
                }
            });
        };
    }
    resolveParams(action, req) {
        let paramsLength = 0;
        action.params.forEach(param => {
            if (param.index >= paramsLength) {
                paramsLength = param.index + 1;
            }
        });
        const params = new Array(paramsLength);
        action.params.forEach(paramMetadata => {
            let param;
            if (req.body && req.body[paramMetadata.name]) {
                param = req.body[paramMetadata.name];
            }
            else if (req.query && req.query[paramMetadata.name]) {
                param = req.query[paramMetadata.name];
            }
            params[paramMetadata.index] = param;
        });
        return params;
    }
}
exports.ControllerMetadata = ControllerMetadata;

//# sourceMappingURL=controllerMetadata.js.map
