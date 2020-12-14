import { Router } from 'express'
const router = Router();

router.post('/lang', (req, res) => {
    res.cookie("locale", req.body.lang || 'en');
    return res.status(204).send();
})

export default router