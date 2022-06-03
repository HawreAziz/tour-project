import { Router, Request, Response } from 'express';
import { User } from '../models/user';


const route = Router();

interface Body {
    email: string;
    googleId: string;
    name: string;
    token: string;
}

route.post('/users/googleSignin', async (req: Request, res: Response) => {
    const { name, googleId, email, token }: Body = req.body;

    const user = await User.findOne({ email });
    if (user) {
        return res.status(200).send({ user, token });
    }

    const newUser = User.build({
        name,
        email,
        googleId,
    });

    await newUser.save();
    res.status(200).send({ newUser, token });
});