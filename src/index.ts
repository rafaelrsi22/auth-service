import express, {Router} from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import dataBase from './db';

dotenv.config();

const authRoute: Router = require('./routes/authRoute');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/auth', authRoute);

app.listen(process.env.PORT, async () => {
    await dataBase.sync();

    console.log('Server listening on port ' + process.env.PORT);
});