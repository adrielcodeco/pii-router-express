"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var glob_1 = __importDefault(require("glob"));
var server_express_1 = require("@pii/server-express");
var di_1 = require("@pii/di");
var moduleloader_1 = require("@pii/moduleloader");
var utils_1 = require("@pii/utils");
var metadata_1 = require("./metadata/metadata");
var metadataKeys_1 = require("./metadata/metadataKeys");
var controllerMetadata_1 = require("./metadata/controllerMetadata");
var controllerToken_1 = require("./controllerToken");
var AbstractExpressRouter = (function (_super) {
    __extends(AbstractExpressRouter, _super);
    function AbstractExpressRouter(path) {
        if (path === void 0) { path = '/'; }
        var _this = _super.call(this) || this;
        _this.path = path;
        _this.controllers = [];
        _this.router = express_1.default.Router();
        _this.router.use(_this.requestHandler.bind(_this));
        return _this;
    }
    AbstractExpressRouter.prototype.add = function (controllerModule) {
        var _this = this;
        if (!controllerModule)
            throw new Error('invalid controller');
        if (controllerModule instanceof Array) {
            controllerModule.forEach(function (m) { return _this.add(m); });
            return undefined;
        }
        var isController = (typeof controllerModule === 'object' ||
            typeof controllerModule === 'function') &&
            utils_1.isClass(controllerModule) &&
            Reflect.hasMetadata(metadataKeys_1.MetadataKeys.controller_name, controllerModule);
        if (isController) {
            var meta = metadata_1.Metadata.get(controllerModule);
            di_1.Container.addSingleton(controllerToken_1.ControllerToken, meta, false);
        }
        else {
            try {
                var controllers = Reflect.ownKeys(controllerModule);
                controllers.forEach(function (key) {
                    var controller = controllerModule[key];
                    var isController = (typeof controller === 'object' ||
                        typeof controller === 'function') &&
                        utils_1.isClass(controller) &&
                        Reflect.hasMetadata(metadataKeys_1.MetadataKeys.controller_name, controller);
                    if (isController) {
                        var meta = metadata_1.Metadata.get(controller);
                        di_1.Container.addSingleton(controllerToken_1.ControllerToken, meta, false);
                    }
                });
            }
            catch (err) {
            }
        }
    };
    AbstractExpressRouter.prototype.addFromFolder = function (directory) {
        var _this = this;
        directory = moduleloader_1.resolvePath(directory);
        if (!directory || !fs_1.default.lstatSync(directory).isDirectory()) {
            throw new Error('invalid directory');
        }
        var files = glob_1.default.sync('**/*.[tj]s', { cwd: directory });
        files.forEach(function (file) {
            var filePath = path_1.default.resolve(directory, file);
            var mod = require(filePath);
            _this.add(mod);
        });
    };
    AbstractExpressRouter.prototype.resolveController = function (file) {
        file = moduleloader_1.resolvePath(file);
        if (!file)
            throw new Error('invalid file');
        var filePath = path_1.default.isAbsolute(file)
            ? file
            : path_1.default.resolve(process.cwd(), file);
        var controllerModule = require(filePath);
        var isController = (typeof controllerModule === 'object' ||
            typeof controllerModule === 'function') &&
            utils_1.isClass(controllerModule) &&
            Reflect.hasMetadata(metadataKeys_1.MetadataKeys.controller_name, controllerModule);
        if (isController) {
            var meta = metadata_1.Metadata.get(controllerModule);
            meta.resolveWith(filePath);
            di_1.Container.addSingleton(controllerToken_1.ControllerToken, meta, false);
        }
        else {
            try {
                var controllers = Reflect.ownKeys(controllerModule);
                controllers.forEach(function (key) {
                    var controller = controllerModule[key];
                    var isController = (typeof controller === 'object' ||
                        typeof controller === 'function') &&
                        utils_1.isClass(controller) &&
                        Reflect.hasMetadata(metadataKeys_1.MetadataKeys.controller_name, controller);
                    if (isController) {
                        var meta = metadata_1.Metadata.get(controller);
                        meta.resolveWith(filePath);
                        di_1.Container.addSingleton(controllerToken_1.ControllerToken, meta, false);
                    }
                });
            }
            catch (err) {
            }
        }
    };
    AbstractExpressRouter.prototype.resolveControllers = function (directory) {
        var _this = this;
        directory = moduleloader_1.resolvePath(directory);
        if (!directory || !fs_1.default.lstatSync(directory).isDirectory()) {
            throw new Error('invalid directory');
        }
        var files = glob_1.default.sync('**/*.[tj]s', { cwd: directory });
        files.forEach(function (file) {
            var filePath = path_1.default.resolve(directory, file);
            _this.resolveController(filePath);
        });
    };
    AbstractExpressRouter.prototype.init = function (server) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!server)
                    throw new Error('server cannot be null');
                this.controllers = di_1.Container.getServices(controllerToken_1.ControllerToken);
                this.controllers.forEach(function (controller) {
                    if (controller instanceof controllerMetadata_1.ControllerMetadata) {
                        controller.use(_this.router);
                    }
                    else {
                        metadata_1.Metadata.get(controller).use(_this.router);
                    }
                });
                server.use(this.path, this.router);
                return [2];
            });
        });
    };
    AbstractExpressRouter.prototype.requestHandler = function (req, res, next) {
        req && Reflect.set(req, 'formatters', this.responseFormatters);
        next && next();
    };
    return AbstractExpressRouter;
}(server_express_1.ExpressRouter));
exports.AbstractExpressRouter = AbstractExpressRouter;

//# sourceMappingURL=abstractExpressRouter.js.map
