import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequest } from '../../errors/bad-request';
import { User } from '../../models/user';
import jwt from 'jsonwebtoken';
import { requestValidator } from '../../middlewares/request-validation';

const route = Router();


route.post("/users/signup",
    body('name')
        .trim()
        .notEmpty()
        .withMessage("Username should be at least one character."),
    body('email')
        .trim()
        .isEmail()
        .withMessage("Invalid email"),
    body('password')
        .trim()
        .notEmpty()
        .isLength({ min: 8, max: 32 })
        .withMessage('Invalid password')
    ,
    [requestValidator],
    async (req: Request, res: Response) => {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new BadRequest("User already exists");
        }

        const user = User.build({ name, email, password });
        await user.save();

        const token = jwt.sign({ email: user.email, id: user.id }, process.env.AUTH_SECRET!, { expiresIn: '1h' });
        res.status(200).send({ user, token });
    });


export { route as singup };