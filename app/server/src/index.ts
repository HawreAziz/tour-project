import "express-async-errors";
import express, { json, urlencoded, RequestHandler } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {
    singup,
    signin,
    createTour,
    showTours
} from "./routes";
import { errorHandler, BadRequest, AuthenticationError } from './errors';

const PORT = 5000;
const app = express();

app.use(json({ limit: "30mb" }) as RequestHandler);
app.use(urlencoded({ limit: "30mb", extended: true }) as RequestHandler);
app.use(cors());
app.use(singup);
app.use(signin);
app.use(createTour);
app.use(showTours);


const { MONGO_PASSWORD, AUTH_SECRET } = process.env;
if (!MONGO_PASSWORD) {
    throw new AuthenticationError("MONGO_PASSWORD was not set, Please add it to the environment");
}


if (!AUTH_SECRET) {
    throw new AuthenticationError("AUTH_SECRET was not set, Please add it to the environment");
}

const MONGODB_URL = `mongodb+srv://hawre:${MONGO_PASSWORD}@cluster0.n1qvl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

// Add apropriate error later
app.all("*", async () => {
    console.log("badRequesteror");
    throw new BadRequest("Page not found");
});

app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect(MONGODB_URL)
        console.log("Connected to the mongodb database");
    } catch (error) {
        console.error("DB could not connect");
        process.exit(1);
    }
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}

start();