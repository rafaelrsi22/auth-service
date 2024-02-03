/*
    TODO:   * Refactor code
            * Verify suspicious attempts
            * Adding two factor security
*/

import { Request, Response } from "express";
import { compareSync as verifyPasswordHashAuthencity } from "bcrypt-ts";

import { BaseController } from "../BaseController";
import User from "../../models/User";
import { AuthenticadedCookie } from "../AuthCookieController";

class LoginUserController extends BaseController {
    protected async executeImplement(req: Request, res: Response) {
        const username = <string>req.query.username;
        const password = <string>req.query.password;

        try {
            const user = await this.findUserByEmailOrUsername(username);

            if (!user) {
                this.clientError(res);
                return;
            }

            const isPasswordCorrect = verifyPasswordHashAuthencity(password, user.dataValues.password);

            if (isPasswordCorrect) {
                const cookie = new AuthenticadedCookie(user.id, user.email, user.username);

                cookie.responseCookie(res);
                res.sendStatus(200);
                return;
            } 
            
            this.unauthorized(res);
        } catch(err) {
            this.clientError(res);
        }
    }

    private async findUserByEmailOrUsername(username: string) : Promise<User | null> {
        return (
            await User.findOne({where: {email: username}})
            ||
            await User.findOne({where: {username}})
        );
    }
}

export default new LoginUserController();