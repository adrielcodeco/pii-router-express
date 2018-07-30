"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const abstractExpressRouter_1 = require("./abstractExpressRouter");
class ViewExpressRouter extends abstractExpressRouter_1.AbstractExpressRouter {
    constructor(path = '/') {
        super(path);
        this.path = path;
        this.responseFormatters = [];
    }
}
exports.ViewExpressRouter = ViewExpressRouter;

//# sourceMappingURL=viewExpressRouter.js.map
