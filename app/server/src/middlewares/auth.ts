import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { UserRequest } from "../data_container";
import { AuthenticationError } from "../errors/authentication-error";


interface User {
    email: string;
    name: string;
    id: string;
}


export const auth = (req: UserRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const parsedToken = token?.split(" ")[1];
    if (!parsedToken || parsedToken === 'undefined') {
        throw new AuthenticationError("Token were not given");
    }
    try {
        const user = jwt.verify(parsedToken, process.env.AUTH_SECRET!) as User;
        req.userId = user.id;
        req.userName = user.name;

    } catch (TokenExipredError) {
        return res.status(404).send({ error: "Could not verify token or token expired." });
    }

    next();
}