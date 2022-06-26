import express, { Request, Response } from 'express';
import { BadRequest } from '../../errors';
import { Tour } from '../../models/tour';


const route = express.Router();


route.get('/tour/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const tour = Tour.findById(id);
        if (!tour) {
            throw new BadRequest("Tour not found");
        }
        return res.status(201).send({ tour });
    } catch (error) {
        return res.status(404).send({ error: "Something went wrong" });
    }
});

export { route as showTourRoute };