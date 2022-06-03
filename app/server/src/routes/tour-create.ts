import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requestValidator } from '../middlewares/request-validation';
import { auth } from '../middlewares/auth';


const route = express.Router()

interface TourProps {
    name: string,
    title: string,
    description?: string,
    imageFile: string,
    likeCount?: number,
    tags: [string],
    creator: string
}

route.post('/tours/create', [
    body('title')
        .not().isEmpty()
        .withMessage("Please provide a title for the tour"),
    body("description")
        .optional(),
    // // body("name")
    // //     .not()
    // //     .isEmpty()
    // //     .withMessage("Please provide a name of the tour"),
    body("tags").isArray(),
    body("imageFile")
        .not()
        .isEmpty()
        .withMessage("Please provide an image")
],
    auth,
    requestValidator,
    async (req: Request, res: Response) => {
        const tourData = req.body as TourProps;
        // const tour = Tour.build({
        //     ...tourData,
        //     createdAt: new Date()
        // });
        // try {
        //     tour.save();
        //     res.status(2001).send(tour);
        // } catch (error) {
        //     res.status(404).send("Something went wrong");
        // }
        res.status(200).send('test');
    });

export { route as createTour };
