import express, { Request, Response } from 'express';
import { Tour } from '../models/tour';

const router = express.Router();


router.get('/tours/show', async (req: Request, res: Response) => {
    try {
        const tours = await Tour.find({});
        res.status(201).send(tours);
    } catch (error) {
        res.status(404).send("Something went wrong");
    }
});


export { router as showTours };