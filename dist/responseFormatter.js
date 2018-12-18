"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@pii/utils");
function formatResponse(formatters, req, result, error) {
    (formatters || []).forEach(function (formatter) {
        if (!utils_1.isFunction(formatter)) {
            throw new Error("invalid formatter " + (formatter.name ||
                formatter.constructor.name ||
                formatter.toString()));
        }
        result = formatter(req, result, error);
    });
    return result;
}
exports.formatResponse = formatResponse;

//# sourceMappingURL=responseFormatter.js.map
