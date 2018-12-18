"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Next = (function () {
    function Next(err) {
        this.err = err;
    }
    Next.prototype.resolve = function () {
        return Promise.resolve(this);
    };
    Next.prototype.reject = function () {
        return Promise.reject(this);
    };
    return Next;
}());
exports.Next = Next;
function next(err) {
    return new Next(err);
}
exports.next = next;

//# sourceMappingURL=next.js.map
