import { Router } from "express";
import { addInterest, removeInterest } from "../controller/publicationInterest.js";

const router = Router();

router.post('/interest/add/:idPublication', addInterest);
router.post('/interest/remove/:idPublication', removeInterest);

export default router;