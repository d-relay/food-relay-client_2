import fetch from 'node-fetch';
import passport from 'passport';
import { Strategy as TwitchStrategy } from 'passport-twitch-strategy';
import url from 'url';

const options = {
    clientID: process.env.TWITCH_CLIENT_ID!,
    clientSecret: process.env.TWITCH_CLIENT_SECRET!,
    callbackURL: process.env.REDIRECT_URL!,
    scope: "user:read:email",
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
        if (resp.ok) {
            const json = await resp.json();
            profile.token = json.token;
            return done(null, profile);
        } else {
            const json = await resp.json();
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

const twitchStrategy = new TwitchStrategy(options, callback);

passport.use(twitchStrategy)

