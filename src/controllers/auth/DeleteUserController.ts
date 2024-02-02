/*

*/
import { Request, Response } from "express";

import { BaseController } from "../BaseController";
import { AuthenticadedCookie } from "../AuthCookieController";
import User from "../../models/User";

class DeleteUserController extends BaseController {
    protected async executeImplement(req: Request, res: Response) {
        AuthenticadedCookie.clearAuthCookie(res);

        await User.destroy({where: {
            id: req.userId
        }});

        res.sendStatus(200);
    }
}

export default new DeleteUserController();