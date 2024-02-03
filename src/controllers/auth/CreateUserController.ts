/*
    TODO:   * Verify if it is a suspicious span, so block an ip for creating more than a determain number of accounts.
            * Adding 2FA
*/

import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { BaseController } from "../BaseController";
import User from "../../models/User";
import { AuthenticadedCookie, hashPassword } from "../AuthCookieController";

import Mail from "../../services/Mail";

type VerifyToken = {
    id: number;
}

class CreateUserController extends BaseController { 
    protected async executeImplement(req: Request, res: Response) {
        const authorizationToken = <string>req.query.token;

        if (authorizationToken) {
            const decodedVerifyToken = <VerifyToken>jwt.verify(authorizationToken, process.env.AUTH_SECRET);
            console.log(decodedVerifyToken);
            await User.update({authorized: true}, {where: {id: decodedVerifyToken.id}});

            res.sendStatus(200);
            return;
        }

        const {email, username, password} = req.body;

        try {
            const newUser = await User.create({email, username, password: hashPassword(password), authorized: false});
            const verifyAccountCookie = jwt.sign({id: newUser.id}, process.env.AUTH_SECRET, {expiresIn: 5 * 60});
            const authTokenEmail = new Mail({
                subject: 'Auth Service - Please verify your account',
                content: 'Please, verify your account at the link below, remember, do not share this with anyone!',
                html: `
                    <h2>Please, verify your account at the link below<h2>
                    <form method="POST" action="http://localhost:3000/auth?token=${verifyAccountCookie}">
                        <input type="submit" value="Click here to verify your account!" />
                    </form>
                    <p>remember, do not share this with anyone!</p>
                `
            });

            authTokenEmail.sendTo(email);
            res.sendStatus(200);
        } catch(err) {
            BaseController.jsonResponse(res, 500, 'User or email already exists');
        }
    }
}

export default new CreateUserController();