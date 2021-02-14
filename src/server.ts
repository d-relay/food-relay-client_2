import dotenv from "dotenv";
dotenv.config();

import http from "http";
import sirv from "sirv";
import debug from 'debug';
import express from "express";
import session from "express-session";


// import helmet from "helmet";
import passport from "passport";
import compression from "compression";
import { createClient } from "redis";
import sessionRedis from "connect-redis";

import jwtExpiration from './middleware/jwt-expiration';
import { i18nMiddleware } from './middleware/i18n';
import './handlers/passport';
import { conroller } from './server/routes';

const dev = process.env.NODE_ENV === "development";

const redisClient = createClient({ url: process.env.REDIS_URL! });
const redisStore = sessionRedis(session);

const app = express();
// if (!dev) {
// 	// app.use(helmet());
// }

app.use(session({
	store: new redisStore({ client: redisClient }),
	cookie: { signed: true, maxAge: 86_400, httpOnly: true },
	secret: process.env.COOKIE_SECRET!,
	resave: true,
	saveUninitialized: true,
}));

app.use(express.json());
app.use(i18nMiddleware());
app.use(jwtExpiration());
app.use(passport.initialize());
app.use(passport.session());
app.use(compression({ threshold: 0 }));
app.use(sirv("static", { dev }));
conroller(app)

const server = http.createServer(app);
server.listen(process.env.PORT || 3000, () => debug('listen ' + process.env.PORT || '3000'));
