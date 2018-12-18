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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var abstractExpressRouter_1 = require("./abstractExpressRouter");
var ViewExpressRouter = (function (_super) {
    __extends(ViewExpressRouter, _super);
    function ViewExpressRouter(path) {
        if (path === void 0) { path = '/'; }
        var _this = _super.call(this, path) || this;
        _this.path = path;
        _this.responseFormatters = [_this.apiResponseFormat];
        return _this;
    }
    ViewExpressRouter.prototype.apiResponseFormat = function (req, result, error) {
        if (error instanceof Error) {
            error = {
                message: error.message,
                stack: error.stack
            };
        }
        return error ? error : result;
    };
    return ViewExpressRouter;
}(abstractExpressRouter_1.AbstractExpressRouter));
exports.ViewExpressRouter = ViewExpressRouter;

//# sourceMappingURL=viewExpressRouter.js.map
