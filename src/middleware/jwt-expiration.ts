import jwt from 'jsonwebtoken'
import type { Response, Request, NextFunction } from 'express';

export default function jwtExpiration() {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.session?.passport?.user?.token;
        if (token) {
            const decoded = jwt.decode(token)!;
            if (Array.isArray(decoded)) {
                const exp: string = (<any>decoded).exp || '0';
                if (Date.now() >= parseInt(exp) * 1000) {
                    return req.session!.destroy(() => {
                        delete req.session!.passport;
                        return res.redirect('/');
                    });
                }
            }
        }
        return next()
    }
}