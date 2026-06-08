import { Router } from "express";
import { createForm, create, closeComments, openComments, deletePublication } from "../controller/post.js";

const router = Router();

router.get('/post/create', createForm);
router.post('/post/create', create);

router.get('/post/closeComments/:idPublication', closeComments);
router.get('/post/openComments/:idPublication', openComments);

router.get('/post/delete/:idPublication', deletePublication);


export default router;