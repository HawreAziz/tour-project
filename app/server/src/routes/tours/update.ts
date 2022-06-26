import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { BadRequest } from "../../errors";
import { auth } from "../../middlewares/auth";
import { validateId } from "../../middlewares/id-validator";
import { requestValidator } from "../../middlewares/request-validation";
import { Tour } from "../../models/tour";


const route = Router();

interface RequestBody {
    title: string;
    description: string | null;
    tags: string[];
    imageFile: string;
    userId: string,
    userName: string
}

// user must own the tour to update TODO
route.put('/tours/update:id', [
    body("title")
        .not()
        .isEmpty()
        .withMessage("Please provide title"),
    body("tags")
        .isArray()
        .withMessage("Tags must be an array"),
    body("imageFile")
        .not()
        .isEmpty()
],
    requestValidator,
    auth,
    validateId,
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, description, imageFile, tags, userId, userName } = req.body as RequestBody;
        const tour = await Tour.findById(id);
        if (!tour) {
            throw new BadRequest("Tour not found");
        }
        tour.update({ title, description, imageFile, tags, creator: userId, name: userName });
        await tour.save();
        res.status(200).send(tour);
    });


export { route as updateRoute };