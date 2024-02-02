/*
    TODO:   * Verify if it is a suspicious span, so block an ip for creating more than a determain number of accounts.
            * Adding 2FA
*/

import { Request, Response } from "express";

import { BaseController } from "../BaseController";
import User from "../../models/User";
import { AuthenticadedCookie, hashPassword } from "../AuthCookieController";

class CreateUserController extends BaseController { 
    protected async executeImplement(req: Request, res: Response) {
        const {email, username, password} = req.body;
        
        try {
            const newUser = await User.create({
                email,
                username,
                password: hashPassword(password)
            });
            const cookie = new AuthenticadedCookie(newUser.id, email, password);
            
            cookie.responseCookie(res);
            res.sendStatus(200);
        } catch(e) {
            BaseController.jsonResponse(res, 500, 'User or email already exists');
        }
    }
}

export default new CreateUserController();