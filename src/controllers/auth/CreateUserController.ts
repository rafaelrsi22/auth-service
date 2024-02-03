/*
    TODO:   * Verify if it is a suspicious span, so block an ip for creating more than a determain number of accounts.
            * Adding 2FA
*/

import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { BaseController } from "../BaseController";
import User from "../../models/User";
import { hashPassword } from "../AuthCookieController";

import Mail from "../../services/Mail";

class CreateUserController extends BaseController { 
    protected async executeImplement(req: Request, res: Response) {
        const {email, username, password} = req.body;

        try {
            const user = await this.createUser(email, username, password);
            const verifyToken = this.generateVerificationToken(user.id);

            this.sendVerificationEmail(email, verifyToken);

            res.sendStatus(200);
        } catch(err) {
            BaseController.jsonResponse(res, 500, 'User or email already exists');
        }
    }

    private createUser(email: string, username: string, password: string) : Promise<User> {
        return User.create({email, username, password: hashPassword(password), authorized: false});
    }

    public sendVerificationEmail(destinatary: string, token: string) {
        const authTokenEmail = new Mail({
            subject: 'Auth Service - Please verify your account',
            content: 'Please, verify your account at the link below, remember, do not share this with anyone!',
            html: `
                <h2>Please, verify your account at the link below<h2>
                <form method="POST" action="http://localhost:3000/auth/verify?token=${token}">
                    <input type="submit" value="Click here to verify your account!" />
                </form>
                <p>remember, do not share this with anyone!</p>
            `
        });

        authTokenEmail.sendTo(destinatary);
    }

    public generateVerificationToken(userId: number) : string {
        return jwt.sign({id: userId}, process.env.AUTH_SECRET, {expiresIn: 5 * 60});
    }
}

export default new CreateUserController();