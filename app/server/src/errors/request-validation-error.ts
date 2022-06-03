import { BaseError } from './base-error';


export class RequestValidationError extends BaseError {
    errorCode: number = 400;

    constructor(public messages: { msg: string }[]) {
        super("Request validation error");
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    getError(): string {
        return this.messages.map(error => error.msg).join('\n');
    }
}