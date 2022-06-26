import { Router, Response } from 'express';
import { body } from 'express-validator';
import { UserRequest } from '../../data_container';
import { BadRequest } from '../../errors';
import { auth } from '../../middlewares/auth';
import { Tour } from '../../models/tour';


const route = Router();

route.delete("/tours/:id", [
    body('id')
        .not()
        .isEmpty()
], auth, async (req: UserRequest, res: Response) => {
    console.log("delete tour");
    const { id } = req.params;
    const { userId } = req;
    const tour = await Tour.findOne({ id, creator: userId });
    if (!tour) {
        throw new BadRequest(`Tour with this id: ${id} does not exist`);
    }
    if (tour.id !== id) {
        throw new BadRequest("You are not allowed to modify tour.");
    }
    await Tour.findByIdAndDelete(id);
    res.status(404).send({ message: "Tour deleted successfully." });
});


export { route as deleteRoute };