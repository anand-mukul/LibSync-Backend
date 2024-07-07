import { Router } from "express";
import {
  followUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  unfollowUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(upload.none(), loginUser);
router.route("/refresh-token").post(refreshAccessToken);

// SECURED ROUTES
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/follow/:userId").post(verifyJWT, followUser);
router.route("/unfollow/:userId").post(verifyJWT, unfollowUser);

export default router;
