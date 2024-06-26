import 'express-async-errors'
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import routes from './routes'
import AppError from "./errors/AppError";
import './typeorm'
import './container'
import rateLimiter from "./middlewares/rateLimiter";

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimiter);

app.use(routes);

app.use(
    (error: Error, request: Request, response: Response, next: NextFunction) => {
        if(error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message
            });
        }

        return response.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    },
);

export { app };