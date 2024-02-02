/*

*/
import { Request, Response } from "express";

import { BaseController } from "../BaseController";
import { hashPassword } from "../AuthCookieController";
import User from "../../models/User";

class UpdateUserController extends BaseController {
    protected async executeImplement(req: Request, res: Response) {
        const { password, username } = req.body;

        if (password) {
            await User.update({password: hashPassword(password)}, {where: {id: req.userId}});

            res.sendStatus(200);
            return;
        } else if (username) {
            await User.update({username}, {where: {id: req.userId}});

            res.sendStatus(200);
            return;
        }

        this.clientError(res);
    }
}

export default new UpdateUserController();