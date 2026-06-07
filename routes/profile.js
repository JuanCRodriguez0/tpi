import { Router } from "express";
import { myProfile, otherProfile, followUser, unfollowUser } from "../controller/profile.js";

const router = Router();

router.get('/profile', myProfile);

router.get('/profile/:idUser', otherProfile);

router.post('/profile/follow/:idUser', followUser);

router.post('/profile/unfollow/:idUser', unfollowUser);

export default router;