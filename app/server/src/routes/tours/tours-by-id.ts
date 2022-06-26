import { Router, Request, Response } from 'express';
import { validateId } from '../../middlewares/id-validator';
import { Tour } from '../../models/tour';


const route = Router();


route.get('/tours/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tours = await Tour.find({ creator: id });
        res.status(201).send({ tours });
    } catch (error) {
        res.status(404).send("Something went wrong on the server");
    }
});

export { route as userToursRoute };