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

async function findUser(loginIdentifier: string) : Promise<User | null>  {
    return (
        await User.findOne({where: {email: loginIdentifier}})
        ||
        await User.findOne({where: {username: loginIdentifier}})
    );
}

class LoginUserController extends BaseController {
    protected async executeImplement(req: Request, res: Response) {
        const loginIdentifier = <string>req.query.loginIdentifier;
        const password = <string>req.query.password;

        try {
            const user = await findUser(loginIdentifier);

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
}

export default new LoginUserController();