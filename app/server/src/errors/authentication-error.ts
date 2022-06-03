import { BaseError } from './base-error';


export class AuthenticationError extends BaseError {
    errorCode: number = 401;

    constructor(public message: string) {
        super(message);
    }
}