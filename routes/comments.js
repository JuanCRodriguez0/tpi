import { Router } from "express";
import { commentsView, addComment } from "../controller/comments.js";

const router = Router();

router.get('/comments/:idPublication', commentsView);
router.post('/comments/:idPublication', addComment);

export default router;