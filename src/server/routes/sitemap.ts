import { Router } from 'express'
const router = Router();


router.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: https://www.relay-food.fun/assets/sitemap.xml");
});

export default router
