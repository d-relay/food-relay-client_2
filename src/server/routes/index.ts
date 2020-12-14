import type { Express } from 'express';
import { middleware as sapperMiddleware } from "@sapper/server";

import auth from './auth';
import cookies from './cookies';
import googleVerification from './google-verigication';


export function conroller(app: Express) {
    app.use(auth)
    app.use(cookies)
    app.use(googleVerification)


    app.use(sapperMiddleware({
        session: (req: any) => {
            return { user: (req.session?.passport?.user) }
        }
    }));
}