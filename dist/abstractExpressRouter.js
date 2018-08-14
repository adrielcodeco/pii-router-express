"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const path = require("path");
const fs = require("fs");
const glob = require("glob");
const server_express_1 = require("@pii/server-express");
const di_1 = require("@pii/di");
const moduleloader_1 = require("@pii/moduleloader");
const utils_1 = require("@pii/utils");
const metadata_1 = require("./metadata/metadata");
const metadataKeys_1 = require("./metadata/metadataKeys");
const controllerMetadata_1 = require("./metadata/controllerMetadata");
const controllerToken_1 = require("./controllerToken");
class AbstractExpressRouter extends server_express_1.ExpressRouter {
    constructor(path = '/') {
        super();
        this.path = path;
        this.controllers = [];
        this.router = express.Router();
        this.router.use(this.requestHandler.bind(this));
    }
    add(controllerModule) {
        if (!controllerModule)
            throw new Error('invalid controller');
        if (controllerModule instanceof Array) {
            controllerModule.forEach(m => this.add(m));
            return undefined;
        }
        const isController = (typeof controllerModule === 'object' ||
            typeof controllerModule === 'function') &&
            utils_1.isClass(controllerModule) &&
            Reflect.hasMetadata(metadataKeys_1.MetadataKeys.controller_name, controllerModule);
        if (isController) {
            const meta = metadata_1.Metadata.get(controllerModule);
            di_1.Container.addSingleton(controllerToken_1.ControllerToken, meta, false);
        }
        else {
            try {
                const controllers = Reflect.ownKeys(controllerModule);
                controllers.forEach(key => {
                    const controller = controllerModule[key];
                    const isController = (typeof controller === 'object' ||
                        typeof controller === 'function') &&
                        utils_1.isClass(controller) &&
                        Reflect.hasMetadata(metadataKeys_1.MetadataKeys.controller_name, controller);
                    if (isController) {
                        const meta = metadata_1.Metadata.get(controller);
                        di_1.Container.addSingleton(controllerToken_1.ControllerToken, meta, false);
                    }
                });
            }
            catch (err) {
            }
        }
    }
    addFromFolder(directory) {
        directory = moduleloader_1.resolvePath(directory);
        if (!directory || !fs.lstatSync(directory).isDirectory()) {
            throw new Error('invalid directory');
        }
        const files = glob.sync('**/*.[tj]s', { cwd: directory });
        files.forEach(file => {
            const filePath = path.resolve(directory, file);
            const mod = require(filePath);
            this.add(mod);
        });
    }
    resolveController(file) {
        file = moduleloader_1.resolvePath(file);
        if (!file)
            throw new Error('invalid file');
        const filePath = path.isAbsolute(file)
            ? file
            : path.resolve(process.cwd(), file);
        const controllerModule = require(filePath);
        const isController = (typeof controllerModule === 'object' ||
            typeof controllerModule === 'function') &&
            utils_1.isClass(controllerModule) &&
            Reflect.hasMetadata(metadataKeys_1.MetadataKeys.controller_name, controllerModule);
        if (isController) {
            const meta = metadata_1.Metadata.get(controllerModule);
            meta.resolveWith(filePath);
            di_1.Container.addSingleton(controllerToken_1.ControllerToken, meta, false);
        }
        else {
            try {
                const controllers = Reflect.ownKeys(controllerModule);
                controllers.forEach(key => {
                    const controller = controllerModule[key];
                    const isController = (typeof controller === 'object' ||
                        typeof controller === 'function') &&
                        utils_1.isClass(controller) &&
                        Reflect.hasMetadata(metadataKeys_1.MetadataKeys.controller_name, controller);
                    if (isController) {
                        const meta = metadata_1.Metadata.get(controller);
                        meta.resolveWith(filePath);
                        di_1.Container.addSingleton(controllerToken_1.ControllerToken, meta, false);
                    }
                });
            }
            catch (err) {
            }
        }
    }
    resolveControllers(directory) {
        directory = moduleloader_1.resolvePath(directory);
        if (!directory || !fs.lstatSync(directory).isDirectory()) {
            throw new Error('invalid directory');
        }
        const files = glob.sync('**/*.[tj]s', { cwd: directory });
        files.forEach(file => {
            const filePath = path.resolve(directory, file);
            this.resolveController(filePath);
        });
    }
    init(server) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!server)
                throw new Error('server cannot be null');
            this.controllers = di_1.Container.getServices(controllerToken_1.ControllerToken);
            this.controllers.forEach(controller => {
                if (controller instanceof controllerMetadata_1.ControllerMetadata) {
                    controller.use(this.router);
                }
                else {
                    metadata_1.Metadata.get(controller).use(this.router);
                }
            });
            server.use(this.path, this.router);
        });
    }
    requestHandler(req, res, next) {
        req && Reflect.set(req, 'formatters', this.responseFormatters);
        next && next();
    }
}
exports.AbstractExpressRouter = AbstractExpressRouter;

//# sourceMappingURL=abstractExpressRouter.js.map
