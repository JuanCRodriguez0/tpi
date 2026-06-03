import { Router } from "express";
import { createForm, create } from "../controller/post.js";

const router = Router();

router.get('/post/create', createForm);
router.post('/post/create', create);

export default router;