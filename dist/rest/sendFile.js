"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SendFile = (function () {
    function SendFile(contentType, file) {
        this.contentType = contentType;
        this.file = file;
    }
    SendFile.prototype.promise = function () {
        return Promise.resolve(this);
    };
    return SendFile;
}());
exports.SendFile = SendFile;
function sendFile(contentType, file) {
    return new SendFile(contentType, file);
}
exports.sendFile = sendFile;

//# sourceMappingURL=sendFile.js.map
