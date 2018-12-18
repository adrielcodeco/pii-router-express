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
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var metadataKeys_1 = require("./metadataKeys");
var redirect_1 = require("../rest/redirect");
var next_1 = require("../rest/next");
var status = __importStar(require("../rest/status"));
var controllerResolver_1 = require("../controllerResolver");
var responseFormatter_1 = require("../responseFormatter");
var di_1 = require("@pii/di");
var scope_1 = __importDefault(require("@pii/scope"));
var utils_1 = require("@pii/utils");
var os = require('os');
var csrf = require('csurf');
var RequiredParamError = (function (_super) {
    __extends(RequiredParamError, _super);
    function RequiredParamError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RequiredParamError;
}(Error));
var InvalidParamError = (function (_super) {
    __extends(InvalidParamError, _super);
    function InvalidParamError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InvalidParamError;
}(Error));
var ControllerMetadata = (function () {
    function ControllerMetadata(controller) {
        if (!controller) {
            throw new Error('Controller cannot be undefined');
        }
        this.controller = controller;
        this.path = Reflect.getMetadata(metadataKeys_1.MetadataKeys.controller_path, this.controller);
    }
    ControllerMetadata.prototype.resolveWith = function (file) {
        this.controllerResolver = new controllerResolver_1.ControllerResolver(file);
    };
    ControllerMetadata.prototype.use = function (router) {
        var _this = this;
        var _router = router;
        if (this.path) {
            _router = express_1.default.Router();
            router.use(this.path, _router);
        }
        var actions = this.getActions();
        actions.forEach(function (action) {
            var args = [action.route];
            if (action.useCSRF) {
                args.push(csrf());
            }
            if ((action.middlewares || []).length > 0) {
                action.middlewares.forEach(function (middleware) {
                    args.push(middleware);
                });
            }
            args.push(_this.requestHandler(action));
            _router[action.method].apply(_router, args);
        });
    };
    ControllerMetadata.prototype.getActions = function () {
        return (Reflect.getMetadata(metadataKeys_1.MetadataKeys.controller_actions, this.controller) ||
            []);
    };
    ControllerMetadata.prototype.requestHandler = function (action) {
        var _this = this;
        return function (req, res, next) {
            return Promise.resolve()
                .then(function () {
                var Controller;
                if (!_this.controllerResolver) {
                    Controller = _this.controller;
                }
                else {
                    var noCacheFor = di_1.Container.getServices('(@pii/di/container).filename').concat(di_1.Container.getServices('(@pii/di).filename'));
                    var _module = scope_1.default.New(_this.controllerResolver.controllerFilePath, {
                        noCacheFor: noCacheFor
                    });
                    if (_module.name === _this.controller.name) {
                        Controller = _module;
                    }
                    else if (_module['default'] &&
                        _module['default'].name === _this.controller.name) {
                        Controller = _module['default'];
                    }
                    else {
                        Controller =
                            _module[_this.controller.name] ||
                                _module['default'][_this.controller.name];
                    }
                }
                return new Controller();
            })
                .then(function (ctrl) {
                var params;
                try {
                    params = _this.resolveParams(action, req, res);
                }
                catch (err) {
                    if (err instanceof RequiredParamError) {
                        return Promise.reject(err);
                    }
                }
                return ctrl[action.action].apply(ctrl, params);
            })
                .then(function (result) {
                if (result instanceof status.StatusCode) {
                    res.status(result.status);
                }
                if (result instanceof redirect_1.Redirect) {
                    res.redirect(result.path);
                }
                else if (result instanceof next_1.Next) {
                    next(result.err);
                }
                else if (action.render) {
                    res.render(action.render, responseFormatter_1.formatResponse(req.formatters, req, result));
                }
                else if (action.method === 'get' || result) {
                    res.json(responseFormatter_1.formatResponse(req.formatters, req, result));
                }
                else {
                    res.status(200).end();
                }
            })
                .catch(function (err) {
                if (err instanceof RequiredParamError ||
                    err instanceof InvalidParamError) {
                    res.status(status.UnprocessableEntity().status);
                }
                else if (err instanceof status.StatusCode) {
                    res.status(err.status);
                }
                if (err instanceof next_1.Next) {
                    next(err.err);
                }
                else if (action.render) {
                    next(responseFormatter_1.formatResponse(req.formatters, req, null, err));
                }
                else if (action.method === 'get' || err) {
                    res.json(responseFormatter_1.formatResponse(req.formatters, req, null, err));
                }
                else {
                    next(err);
                }
                return err;
            });
        };
    };
    ControllerMetadata.prototype.resolveParams = function (action, req, res) {
        var actionParams = action.params || [];
        var params = [];
        actionParams.forEach(function (paramMetadata) {
            var param;
            var key = paramMetadata.key;
            if (key === '_req') {
                param = req;
            }
            else if (key === '_res') {
                param = res;
            }
            else if (req.body && Reflect.has(req.body, key)) {
                param = req.body[key];
            }
            else if (req.query && Reflect.has(req.query, key)) {
                param = req.query[key];
            }
            else if (req.params && Reflect.has(req.params, key)) {
                param = req.params[key];
            }
            if (paramMetadata.required && utils_1.Is.isNullOrUndefined(param)) {
                throw new RequiredParamError("Required param: " + key);
            }
            if (paramMetadata.validation) {
                var validationResult = paramMetadata.validation(param, req);
                if (validationResult) {
                    var errorMessage = "Invalid param: " + key + os.EOL;
                    errorMessage += validationResult;
                    throw new InvalidParamError(errorMessage);
                }
            }
            params[paramMetadata.index] = param;
        });
        return params;
    };
    return ControllerMetadata;
}());
exports.ControllerMetadata = ControllerMetadata;

//# sourceMappingURL=controllerMetadata.js.map
