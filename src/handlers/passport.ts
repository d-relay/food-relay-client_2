import url from 'url';
import fetch from 'node-fetch';
import passport from 'passport';

import { Strategy as TwitchStrategy } from 'passport-twitch-strategy';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

const twitchOptions = {
    clientID: process.env.TWITCH_CLIENT_ID!,
    clientSecret: process.env.TWITCH_CLIENT_SECRET!,
    callbackURL: process.env.TWITCH_REDIRECT_URL!,
    scope: "user:read:email",
    state: true
}

const googleOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_REDIRECT_URL!,
    scope: ['email', 'profile'],
    state: true
}

const callback = async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
    try {
        profile.accessToken = accessToken;
        profile.refreshToken = refreshToken;
        const loginURL = url.resolve(process.env.API_BASE_URL!, 'login');
        const resp = await fetch(loginURL, {
            method: 'POST',
            body: JSON.stringify(profile),
            headers: { 'Content-Type': 'application/json' }
        });
        const json = await resp.json();
        if (resp.ok) {
            return done(null, json);
        } else {
            return done(json, false);
        }
    } catch (err) {
        return done(err, false);
    }
}


passport.serializeUser(function (profile, done) {
    done(null, profile);
});

passport.deserializeUser(function (profile, done) {
    done(null, profile);
});

const twitchStrategy = new TwitchStrategy(twitchOptions, callback);
const googleStrategy = new GoogleStrategy(googleOptions, callback);

passport.use(twitchStrategy);
passport.use(googleStrategy);

