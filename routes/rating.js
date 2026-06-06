import { Router } from "express";
import { rate } from "../controller/rating.js";

const router = Router();

router.post('/rating/:idPublication', rate);

export default router;