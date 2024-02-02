/*

*/
import { Request, Response } from "express";

import { BaseController } from "../BaseController";
import { AuthenticadedCookie } from "../AuthCookieController";

class LogoutUserController extends BaseController {
    protected async executeImplement(req: Request, res: Response) {
        AuthenticadedCookie.clearAuthCookie(res);
        res.sendStatus(200);
    }
}

export default new LogoutUserController();