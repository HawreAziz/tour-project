import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { PasswordManager } from '../../utils/password';
import { AuthenticationError } from '../errors';
import { requestValidator } from '../middlewares/request-validation';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

const route = Router();


route.post("/users/signin",
    body("email")
        .trim()
        .isEmail()
        .withMessage("Invalid email"),
    body("password")
        .trim()
        .isLength({ min: 8, max: 32 })
        .withMessage("Invalid password, must be between 8-32 characters")
    ,
    [requestValidator],
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new AuthenticationError("User does not exist");
        }

        const isPasswordCorrect = await PasswordManager.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new AuthenticationError("Incorrect password.");
        }

        const token = jwt.sign({ email: user.id, id: user.id }, process.env.AUTH_SECRET!, { expiresIn: "1h" });
        res.status(200).send({ user, token });
    });

export { route as signin };