/*

*/

import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { BaseController } from "../BaseController";
import User from "../../models/User";

type VerifyToken = {
    id: number;
}

class VerifyUserController extends BaseController { 
    protected async executeImplement(req: Request, res: Response) {
        const authorizationToken = <string>req.query.token;

        if (authorizationToken) {
            const decodedVerifyToken = <VerifyToken>jwt.verify(authorizationToken, process.env.AUTH_SECRET);
            console.log(decodedVerifyToken);
            await User.update({authorized: true}, {where: {id: decodedVerifyToken.id}});

            res.sendStatus(200);
            return;
        }

        res.end();
    }
}

export default new VerifyUserController();