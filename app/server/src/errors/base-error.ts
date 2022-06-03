


export abstract class BaseError extends Error {
    abstract errorCode: number;
    constructor(public message: string) {
        super(message);
        Object.setPrototypeOf(this, BaseError.prototype);
    }
    getError(): string {
        return this.message;
    }
}