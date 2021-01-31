import { Router } from 'express'
import passport from 'passport'

const router = Router();

router.get("/auth/google", passport.authenticate("google"));
router.get("/auth/google/callback", passport.authenticate("google", { successRedirect: "/settings", failureRedirect: "/" }));
router.get("/auth/twitch", passport.authenticate("twitch"));
router.get("/auth/twitch/callback", passport.authenticate("twitch", { successRedirect: "/settings", failureRedirect: "/" }));

// router.get("/auth/login", (req: any, res, next) => {
//     return (req.session?.passport?.user)
//         ? res.redirect("/profile")
//         : next();
// })

router.get("/auth/logout", (req, res) => {
    req.logout();
    req.session?.destroy((err) => res.redirect("/"));
});

export default router