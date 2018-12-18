export declare class StatusCode {
    status: number;
    body?: any;
    resolve?: boolean | undefined;
    constructor(status: number, body?: any, resolve?: boolean | undefined);
    promise(): Promise<this>;
}
export declare function Ok(body?: any): StatusCode;
export declare function Created(body?: any): StatusCode;
export declare function Accepted(body?: any): StatusCode;
export declare function NoContent(body?: any): StatusCode;
export declare function ResetContent(body?: any): StatusCode;
export declare function PartialContent(body?: any): StatusCode;
export declare function NotModified(body?: any): StatusCode;
export declare function BadRequest(body?: any): StatusCode;
export declare function Unauthorized(body?: any): StatusCode;
export declare function PaymentRequired(body?: any): StatusCode;
export declare function Forbidden(body?: any): StatusCode;
export declare function NotFound(body?: any): StatusCode;
export declare function MethodNotAllowed(body?: any): StatusCode;
export declare function NotAcceptable(body?: any): StatusCode;
export declare function ProxyAuthenticationRequired(body?: any): StatusCode;
export declare function RequestTimeout(body?: any): StatusCode;
export declare function Conflict(body?: any): StatusCode;
export declare function Gone(body?: any): StatusCode;
export declare function LengthRequired(body?: any): StatusCode;
export declare function PreconditionFailed(body?: any): StatusCode;
export declare function RequestedRangeNotSatisfiable(body?: any): StatusCode;
export declare function ExpectationFailed(body?: any): StatusCode;
export declare function UnprocessableEntity(body?: any): StatusCode;
export declare function TooManyRequests(body?: any): StatusCode;
export declare function InternalServerError(body?: any): StatusCode;
export declare function NotImplemented(body?: any): StatusCode;
//# sourceMappingURL=status.d.ts.map