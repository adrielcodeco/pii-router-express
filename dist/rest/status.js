"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StatusCode = (function () {
    function StatusCode(status, body, resolve) {
        this.status = status;
        this.body = body;
        this.resolve = resolve;
    }
    StatusCode.prototype.promise = function () {
        return this.resolve ? Promise.resolve(this) : Promise.reject(this);
    };
    return StatusCode;
}());
exports.StatusCode = StatusCode;
function Ok(body) {
    return new StatusCode(200, body);
}
exports.Ok = Ok;
function Created(body) {
    return new StatusCode(201, body);
}
exports.Created = Created;
function Accepted(body) {
    return new StatusCode(202, body);
}
exports.Accepted = Accepted;
function NoContent(body) {
    return new StatusCode(204, body);
}
exports.NoContent = NoContent;
function ResetContent(body) {
    return new StatusCode(205, body);
}
exports.ResetContent = ResetContent;
function PartialContent(body) {
    return new StatusCode(206, body);
}
exports.PartialContent = PartialContent;
function NotModified(body) {
    return new StatusCode(304, body);
}
exports.NotModified = NotModified;
function BadRequest(body) {
    return new StatusCode(400, body, false);
}
exports.BadRequest = BadRequest;
function Unauthorized(body) {
    return new StatusCode(401, body, false);
}
exports.Unauthorized = Unauthorized;
function PaymentRequired(body) {
    return new StatusCode(402, body, false);
}
exports.PaymentRequired = PaymentRequired;
function Forbidden(body) {
    return new StatusCode(403, body, false);
}
exports.Forbidden = Forbidden;
function NotFound(body) {
    return new StatusCode(404, body, false);
}
exports.NotFound = NotFound;
function MethodNotAllowed(body) {
    return new StatusCode(405, body, false);
}
exports.MethodNotAllowed = MethodNotAllowed;
function NotAcceptable(body) {
    return new StatusCode(406, body, false);
}
exports.NotAcceptable = NotAcceptable;
function ProxyAuthenticationRequired(body) {
    return new StatusCode(407, body, false);
}
exports.ProxyAuthenticationRequired = ProxyAuthenticationRequired;
function RequestTimeout(body) {
    return new StatusCode(408, body, false);
}
exports.RequestTimeout = RequestTimeout;
function Conflict(body) {
    return new StatusCode(409, body, false);
}
exports.Conflict = Conflict;
function Gone(body) {
    return new StatusCode(410, body, false);
}
exports.Gone = Gone;
function LengthRequired(body) {
    return new StatusCode(411, body, false);
}
exports.LengthRequired = LengthRequired;
function PreconditionFailed(body) {
    return new StatusCode(412, body, false);
}
exports.PreconditionFailed = PreconditionFailed;
function RequestedRangeNotSatisfiable(body) {
    return new StatusCode(416, body, false);
}
exports.RequestedRangeNotSatisfiable = RequestedRangeNotSatisfiable;
function ExpectationFailed(body) {
    return new StatusCode(417, body, false);
}
exports.ExpectationFailed = ExpectationFailed;
function UnprocessableEntity(body) {
    return new StatusCode(422, body, false);
}
exports.UnprocessableEntity = UnprocessableEntity;
function TooManyRequests(body) {
    return new StatusCode(429, body, false);
}
exports.TooManyRequests = TooManyRequests;
function InternalServerError(body) {
    return new StatusCode(500, body, false);
}
exports.InternalServerError = InternalServerError;
function NotImplemented(body) {
    return new StatusCode(501, body, false);
}
exports.NotImplemented = NotImplemented;

//# sourceMappingURL=status.js.map
