import express, {NextFunction, Request, Response, Router} from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import dotenv from 'dotenv';

dotenv.config();

const dataBase = require('./db');
const authRoute: Router = require('./routes/authRoute');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));

app.use('/auth', authRoute);

app.listen(process.env.PORT, async () => {
    await dataBase.sync();

    console.log('Server listening on port ' + process.env.PORT);
});
