import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { AuthenticationError } from "../errors/authentication-error";



export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        throw new AuthenticationError("Token were not given");
    }
    const parsedToken = token.split(" ")[1];
    console.log(`auth in auth ${parsedToken}`);
    try {
        const data = jwt.verify(parsedToken, process.env.AUTH_SECRET!) as string;
        console.log(data);
    } catch (error) {
        console.log(error);
    }

    next();
}