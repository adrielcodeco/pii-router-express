"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
const path = require("path");
const fs = require("fs");
const server_express_1 = require("@pii/server-express");
const di_1 = require("@pii/di");
const restExpressRouter_1 = require("./restExpressRouter");
const viewExpressRouter_1 = require("./viewExpressRouter");
__export(require("./decorators"));
__export(require("./controllerResolver"));
__export(require("./restExpressRouter"));
__export(require("./viewExpressRouter"));
function defaultRestRouterFrom(controllersDir) {
    if (!controllersDir) {
        throw new Error('invalid directory');
    }
    if (!path.isAbsolute(controllersDir)) {
        controllersDir = path.resolve(process.cwd(), controllersDir);
    }
    if (!fs.lstatSync(controllersDir).isDirectory()) {
        throw new Error('invalid directory');
    }
    const router = new restExpressRouter_1.RESTExpressRouter();
    di_1.Container.addTransient(server_express_1.ExpressRouterToken, router);
    const files = glob.sync('**/*.[tj]s', { cwd: controllersDir });
    files.forEach(file => {
        const filePath = path.resolve(controllersDir, file);
        require(filePath);
    });
}
exports.defaultRestRouterFrom = defaultRestRouterFrom;
function defaultViewRouterFrom(controllersDir) {
    if (!controllersDir) {
        throw new Error('invalid directory');
    }
    if (!path.isAbsolute(controllersDir)) {
        controllersDir = path.resolve(process.cwd(), controllersDir);
    }
    if (!fs.lstatSync(controllersDir).isDirectory()) {
        throw new Error('invalid directory');
    }
    const router = new viewExpressRouter_1.ViewExpressRouter();
    di_1.Container.addTransient(server_express_1.ExpressRouterToken, router);
    const files = glob.sync('**/*.[tj]s', { cwd: controllersDir });
    files.forEach(file => {
        const filePath = path.resolve(controllersDir, file);
        require(filePath);
    });
}
exports.defaultViewRouterFrom = defaultViewRouterFrom;

//# sourceMappingURL=index.js.map
