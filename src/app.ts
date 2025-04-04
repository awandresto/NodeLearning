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
import routesAuth from './routes/auth';
import routesUser from './routes/user';

const app: Express = express();
const port: number = parseInt(process.env.PORT || '3000', 10);

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(hpp());

app.use('/auth', routesAuth);
app.use('/users', routesUser);

app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

AppDataSource.initialize()
    .then(async (data) => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log('Error: ', err);
    });
