export class StatusCode {
  constructor (
    public status: number,
    public body?: any,
    public resolve?: boolean
  ) {}
  promise () {
    return this.resolve ? Promise.resolve(this) : Promise.reject(this)
  }
}

export function Ok (body?: any) {
  return new StatusCode(200, body)
}

export function Created (body?: any) {
  return new StatusCode(201, body)
}

export function Accepted (body?: any) {
  return new StatusCode(202, body)
}

export function NoContent (body?: any) {
  return new StatusCode(204, body)
}

export function ResetContent (body?: any) {
  return new StatusCode(205, body)
}

export function PartialContent (body?: any) {
  return new StatusCode(206, body)
}

export function NotModified (body?: any) {
  return new StatusCode(304, body)
}

export function BadRequest (body?: any) {
  return new StatusCode(400, body, false)
}

export function Unauthorized (body?: any) {
  return new StatusCode(401, body, false)
}

export function PaymentRequired (body?: any) {
  return new StatusCode(402, body, false)
}

export function Forbidden (body?: any) {
  return new StatusCode(403, body, false)
}

export function NotFound (body?: any) {
  return new StatusCode(404, body, false)
}

export function MethodNotAllowed (body?: any) {
  return new StatusCode(405, body, false)
}

export function NotAcceptable (body?: any) {
  return new StatusCode(406, body, false)
}

export function ProxyAuthenticationRequired (body?: any) {
  return new StatusCode(407, body, false)
}

export function RequestTimeout (body?: any) {
  return new StatusCode(408, body, false)
}

export function Conflict (body?: any) {
  return new StatusCode(409, body, false)
}

export function Gone (body?: any) {
  return new StatusCode(410, body, false)
}

export function LengthRequired (body?: any) {
  return new StatusCode(411, body, false)
}

export function PreconditionFailed (body?: any) {
  return new StatusCode(412, body, false)
}

export function RequestedRangeNotSatisfiable (body?: any) {
  return new StatusCode(416, body, false)
}

export function ExpectationFailed (body?: any) {
  return new StatusCode(417, body, false)
}

export function UnprocessableEntity (body?: any) {
  return new StatusCode(422, body, false)
}

export function TooManyRequests (body?: any) {
  return new StatusCode(429, body, false)
}

export function InternalServerError (body?: any) {
  return new StatusCode(500, body, false)
}

export function NotImplemented (body?: any) {
  return new StatusCode(501, body, false)
}
