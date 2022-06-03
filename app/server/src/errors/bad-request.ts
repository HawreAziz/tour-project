import { BaseError } from './base-error';


export class BadRequest extends BaseError {
    errorCode: number = 400;

    constructor(public message: string) {
        super(message);
    }
}