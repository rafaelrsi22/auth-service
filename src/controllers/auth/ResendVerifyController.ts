/*

*/

import { Request, Response } from "express";

import { BaseController } from "../BaseController";
import CreateUserController from "./CreateUserController";
import User from "../../models/User";

class ResendVerifyController extends BaseController { 
    protected async executeImplement(req: Request, res: Response) {
        const {email} = req.body;
        const userId = await User.findOne({where: {email}});
        const token = CreateUserController.generateVerificationToken(userId?.id!);

        CreateUserController.sendVerificationEmail(email, token);

        res.sendStatus(200);
    }
}

export default new ResendVerifyController();