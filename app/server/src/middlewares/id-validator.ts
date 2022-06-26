import { NextFunction, Request, Response } from 'express';
import { BadRequest } from '../errors';
import mongoose from 'mongoose';


export const validateId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequest(`${id} is not a valid id`);
    }
    next();
}