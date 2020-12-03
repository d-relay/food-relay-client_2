import dotenv from "dotenv";
dotenv.config();

import http from "http";
import sirv from "sirv";
import debug from 'debug';
import express from "express";
import session from "express-session";
import { middleware as sapperMiddleware } from "@sapper/server";

// import helmet from "helmet";
import passport from "passport";
import compression from "compression";
import bodyParser from "body-parser";
import { createClient } from "redis";
import sessionRedis from "connect-redis";

import jwtExpiration from './middleware/jwt-expiration';
import { i18nMiddleware } from './middleware/i18n';
import './handlers/passport';

const { NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const redisClient = createClient({ url: process.env.REDIS_URL! });
const redisStore = sessionRedis(session);

const app = express();
// if (!dev) {
// 	// app.use(helmet());
// }

app.use(session({
	store: new redisStore({ client: redisClient }),
	cookie: { signed: true, maxAge: 8640000000, httpOnly: true },
	secret: process.env.COOKIE_SECRET!,
	resave: true,
	saveUninitialized: true,
}));

app.use(bodyParser.json());
app.use(i18nMiddleware());
app.use(jwtExpiration());
app.use(passport.initialize());
app.use(passport.session());
app.use(compression({ threshold: 0 }));
app.use(sirv("static", { dev }));

app.get("/auth/login", (req: any, res) => (req.session?.passport?.user) ? res.redirect("/profile") : res.redirect("/auth/twitch"));
app.get("/auth/twitch", passport.authenticate("twitch"));
app.get("/auth/twitch/callback", passport.authenticate("twitch", { successRedirect: "/profile", failureRedirect: "/" }));

app.get("/auth/logout", (req, res) => {
	req.logout();
	req.session?.destroy((err) => res.redirect("/"));
});

app.use(sapperMiddleware({ session: (req: any) => ({ user: (req.session?.passport?.user) }) }));

const server = http.createServer(app);
server.listen(process.env.PORT || 3000, () => debug('listen ' + process.env.PORT || '3000'));
