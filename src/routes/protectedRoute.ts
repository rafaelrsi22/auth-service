import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

import { AuthenticadedCookie } from "../controllers/AuthCookieController";
import User from "../models/User";

interface IJWTPayload {
    id: string;
}

function verifyTokenAuthenticity(token: string) {
    return <IJWTPayload>jwt.verify(token, process.env.AUTH_SECRET);
}

async function authorizedRoute(req: Request, res: Response, next: NextFunction) {
    const authorizationToken = AuthenticadedCookie.getCookie(req)?.authorizationToken;

    try {
        const userId = verifyTokenAuthenticity(authorizationToken!).id;
        const user = await User.findByPk(userId);

        if (!user?.authorized) {
            res.status(401).json({message: 'Unauthorized'})    
        }

        req.userId = userId;
        req.user = user;

        next();
    } catch(err) {
        res.status(401).json({message: 'Unauthorized'})
    }
}

export {authorizedRoute}