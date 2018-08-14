"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const abstractExpressRouter_1 = require("./abstractExpressRouter");
class RESTExpressRouter extends abstractExpressRouter_1.AbstractExpressRouter {
    constructor(path = '/api') {
        super(path);
        this.path = path;
        this.responseFormatters = [this.apiResponseFormat];
    }
    apiResponseFormat(req, result, error) {
        const res = {
            success: !error
        };
        if (error) {
            res.error = error;
        }
        else {
            res.data = result;
        }
        return res;
    }
}
exports.RESTExpressRouter = RESTExpressRouter;

//# sourceMappingURL=restExpressRouter.js.map
