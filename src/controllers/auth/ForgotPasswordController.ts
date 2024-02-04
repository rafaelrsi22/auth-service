/*

*/
import { Request, Response } from "express";

import { BaseController } from "../BaseController";
import jwt from 'jsonwebtoken';
import Mail from "../../services/Mail";
import User from "../../models/User";

class ForgotPasswordController extends BaseController { 
    protected async executeImplement(req: Request, res: Response) {
        const {email} = req.body;
        const user = await User.findOne({where: {email}});
        const passwordChangeToken = jwt.sign({id: user?.id!}, process.env.AUTH_SECRET);

        this.sendPasswordChangeEmail(email, passwordChangeToken);
        res.sendStatus(200);
    }

    public sendPasswordChangeEmail(destinatary: string, token: string) {
        const passwordEmail = new Mail({
            subject: 'Auth Service - Password Change Request',
            content: 'Please, change your password with the link below (DO NOT SEND THIS TO',
            html: `
                <h2>Please, change your password with the link below<h2>
                <form method="POST" action="">
                    <input type="submit" value="Change password" />
                </form>
                <small>remember, do not share this with anyonee</small>
            `
        });

        passwordEmail.sendTo(destinatary);
    }
}

export default new ForgotPasswordController();