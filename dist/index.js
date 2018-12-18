"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var glob_1 = __importDefault(require("glob"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var server_express_1 = require("@pii/server-express");
var di_1 = require("@pii/di");
var restExpressRouter_1 = require("./restExpressRouter");
var viewExpressRouter_1 = require("./viewExpressRouter");
var status = __importStar(require("./rest/status"));
exports.status = status;
__export(require("./decorators"));
__export(require("./controllerResolver"));
__export(require("./restExpressRouter"));
__export(require("./viewExpressRouter"));
__export(require("./rest/next"));
__export(require("./rest/redirect"));
__export(require("./rest/sendFile"));
__export(require("./actionMiddleware"));
function defaultRestRouterFrom(controllersDir) {
    if (!controllersDir) {
        throw new Error('invalid directory');
    }
    if (!path_1.default.isAbsolute(controllersDir)) {
        controllersDir = path_1.default.resolve(process.cwd(), controllersDir);
    }
    if (!fs_1.default.lstatSync(controllersDir).isDirectory()) {
        throw new Error('invalid directory');
    }
    var router = new restExpressRouter_1.RESTExpressRouter();
    di_1.Container.addTransient(server_express_1.ExpressRouterToken, router);
    var files = glob_1.default.sync('**/*.[tj]s', { cwd: controllersDir });
    files.forEach(function (file) {
        var filePath = path_1.default.resolve(controllersDir, file);
        require(filePath);
    });
}
exports.defaultRestRouterFrom = defaultRestRouterFrom;
function defaultViewRouterFrom(controllersDir) {
    if (!controllersDir) {
        throw new Error('invalid directory');
    }
    if (!path_1.default.isAbsolute(controllersDir)) {
        controllersDir = path_1.default.resolve(process.cwd(), controllersDir);
    }
    if (!fs_1.default.lstatSync(controllersDir).isDirectory()) {
        throw new Error('invalid directory');
    }
    var router = new viewExpressRouter_1.ViewExpressRouter();
    di_1.Container.addTransient(server_express_1.ExpressRouterToken, router);
    var files = glob_1.default.sync('**/*.[tj]s', { cwd: controllersDir });
    files.forEach(function (file) {
        var filePath = path_1.default.resolve(controllersDir, file);
        require(filePath);
    });
}
exports.defaultViewRouterFrom = defaultViewRouterFrom;

//# sourceMappingURL=index.js.map
