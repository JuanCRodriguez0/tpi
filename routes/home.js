import { Router } from "express";
import { home } from "../controller/home.js";

const router = Router();

router.get('/home', home);

export default router;