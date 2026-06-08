import { Router } from "express";
import { home, searchResults, searchUsers, searchTags } from "../controller/home.js";

const router = Router();

router.get('/home', home);

router.get('/search', searchResults);
router.get('/search/users', searchUsers);
router.get('/search/tags', searchTags);

export default router;