import { Router } from "express";
import { commentsView, addComment, deleteComment } from "../controller/comments.js";

const router = Router();

router.get('/comments/:idPublication', commentsView);
router.post('/comments/:idPublication', addComment);
router.get('/comments/delete/:idComment', deleteComment);

export default router;