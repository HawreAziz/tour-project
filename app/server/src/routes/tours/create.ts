import express, { Response } from 'express';
import { body } from 'express-validator';
import { requestValidator } from '../../middlewares/request-validation';
import { auth } from '../../middlewares/auth';
import { Tour } from '../../models/tour';
import { UserRequest } from '../../data_container';


const route = express.Router()

interface TourProps {
    title: string,
    description?: string,
    imageFile: string,
    likeCount?: number,
    tags: [string],
}



route.post('/tours/create', [
    body('title')
        .not().isEmpty()
        .withMessage("Please provide a title for the tour"),
    body("description")
        .optional(),
    body("tags").isArray(),
    body("imageFile")
        .not()
        .isEmpty()
        .withMessage("Please provide an image")
],
    auth,
    requestValidator,
    async (req: UserRequest, res: Response) => {
        const tourData = req.body as TourProps;
        const tour = Tour.build({
            ...tourData,
            name: req.userName || "",
            creator: req.userId || "",
            createdAt: new Date()
        });
        try {
            tour.save();
            res.status(201).send(tour);
        } catch (error) {
            console.log(error);
            res.status(404).send("Something went wrong");
        }
    });

export { route as createTour };
