/*
    TODO: Refactor AuthCookieController into a Service (Controllers should be only for routes methods);
*/

import { Request, Response } from "express";
import { genSaltSync, hashSync } from "bcrypt-ts"
import jwt from "jsonwebtoken";

function signAuthorizationToken(userId: number) : string {
    return jwt.sign({id: userId}, process.env.AUTH_SECRET, {expiresIn: '24h'});
}

function hashPassword(password: string) : string {
    return hashSync(password, genSaltSync(10));
}

class AuthenticadedCookie {
    private readonly email: string;
    private readonly username: string;
    private readonly authorizationToken: string;

    constructor(userId: number, email: string, username: string) {
        this.email = email;
        this.username = username;
        this.authorizationToken = signAuthorizationToken(userId);
    }

    public responseCookie(res: Response) : void {
        res.cookie(process.env.AUTH_COOKIE_NAME, this);
    }

    public static getCookie(req: Request) : {email: string, username: string, authorizationToken: string} | null {
        return req.cookies[process.env.AUTH_COOKIE_NAME];
    }

    public static clearAuthCookie(res: Response) {
        res.clearCookie(process.env.AUTH_COOKIE_NAME);
    }
}

export {AuthenticadedCookie, hashPassword};