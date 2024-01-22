import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Midleware for handling CORS POLICY
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    }));

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('This is my Mern-stack')
} );

app.use('/books', booksRoute);



mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Server connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    } )
    .catch((error) => {
        console.log(error);
    });

