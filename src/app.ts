import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import bodyParser from 'body-parser';
import cors from 'cors';
import { AppDataSource } from './data-source';

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(hpp());

app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

const port: number = parseInt(process.env.PORT || '3000', 10);

AppDataSource.initialize()
    .then(async (data) => {
        app.listen(port, _ => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log('Error: ', err);
    });
