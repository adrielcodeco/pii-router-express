"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Redirect = (function () {
    function Redirect(path) {
        this.path = path;
    }
    Redirect.prototype.resolve = function () {
        return Promise.resolve(this);
    };
    Redirect.prototype.reject = function () {
        return Promise.reject(this);
    };
    return Redirect;
}());
exports.Redirect = Redirect;
function redirect(path) {
    return new Redirect(path);
}
exports.redirect = redirect;

//# sourceMappingURL=redirect.js.map
