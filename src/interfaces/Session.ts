import type { Session } from "express-session"

export interface UserSession extends Session {
    passport: {
        user: {
            token: string;
        }
    }
}