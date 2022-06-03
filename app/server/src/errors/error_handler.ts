import { NextFunction, Request, Response } from "express";
import { BaseError } from "./base-error";


export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof BaseError) {
        return res.status(error.errorCode).send({ "error": error.getError() });
    }
    return res.status(400).send("None custom error, something went wrong");
}