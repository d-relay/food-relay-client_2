import sirv from 'sirv';
import session from 'express-session'
import compression from 'compression';
import bodyParser from 'body-parser';
import * as sapper from '@sapper/server';
import express, { Express } from "express";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

express().use(
	// session({
	// 	store: new redisStore({ client: redisClient }),
	// 	cookie: { signed: true, maxAge: 8640000000, httpOnly: true },
	// 	secret: process.env.COOKIE_SECRET,
	// 	resave: true, saveUninitialized: true,
	// }),
	bodyParser.json(),
	compression({ threshold: 0 }),
	sirv('static', { dev }),
).use(sapper.middleware({
	session: (req: { session: { passport: { user: any; }; }; }) => ({
		user: (req.session?.passport?.user)
	})
})).listen(parseInt(PORT || '3000'), function (err: any) {
	if (err) console.log('error', err);
});