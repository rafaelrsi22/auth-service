import { Request, Response } from "express";
import { genSaltSync, hashSync } from "bcrypt-ts";
import jwt from "jsonwebtoken";

import { BaseController } from "../BaseController";
import User from "../../models/User";

interface IUserForm {
    email: string,
    username: string,
    password: string
}

function hashPassword(password: string) : string {
    return hashSync(password, genSaltSync(10));
}

function signAuthorizationToken(userId: number) : string {
    return jwt.sign({id: userId}, process.env.AUTH_SECRET, {expiresIn: '24h'});
}

class CreateUserController extends BaseController {
    protected async executeImplement(req: Request, res: Response) {
        const userForm : IUserForm = req.body;
        
        try {
            const newUser = await User.create({
                email: userForm.email,
                username: userForm.username,
                password: hashPassword(userForm.password)
            });

            res.cookie('authenticated-user', {
                email: userForm.email,
                username: userForm.username,
                authorization: signAuthorizationToken(newUser.id)
            });

            res.sendStatus(200);
        } catch(e) {
            BaseController.jsonResponse(res, 500, 'User already exists');
        }
    }
}

export default new CreateUserController();