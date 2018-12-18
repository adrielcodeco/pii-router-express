"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionMetadata = (function () {
    function ActionMetadata(key, route, action, method) {
        this.key = key;
        this.route = route;
        this.action = action;
        this.method = method;
        this.params = [];
        this.middlewares = [];
    }
    return ActionMetadata;
}());
exports.ActionMetadata = ActionMetadata;

//# sourceMappingURL=actionMetadata.js.map
