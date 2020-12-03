import jwt from 'jsonwebtoken'
import type { Response, Request, NextFunction } from 'express';
import type { UserSession } from '../interfaces/Session';

export default function jwtExpiration() {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = (req.session as UserSession)?.passport?.user?.token;
        if (token) {
            const decoded = jwt.decode(token);
            if (decoded) {
                const exp: string = (<any>decoded).exp || '0';
                if (Date.now() >= parseInt(exp) * 1000) {
                    return req.session?.destroy(() => {
                        if (req.session['passport']) {
                            delete req.session['passport'];
                        }
                        return res.redirect('/auth/twitch');
                    });
                }
            }
        }
        return next()
    }
}