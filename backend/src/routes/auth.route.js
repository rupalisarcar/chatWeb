import express from "express";
import { signUp, login, logOut, updatedProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const  router = express.Router();


router.post('/signup', signUp)

router.post('/login', login)

router.post('/logout', logOut)

router.put('/update-profile', protectRoute, upload.single('profilePic'), updatedProfile)

router.get("/check", protectRoute, (req, res) => res.status(200).json(req.user));

export default router;