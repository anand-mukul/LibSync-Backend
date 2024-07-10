import { Router } from "express";
import {
  changeCurrentPassword,
  followUser,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  unfollowUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import passport from "passport";
import "../lib/passport.js";

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
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/follow/:userId").post(verifyJWT, followUser);
router.route("/unfollow/:userId").post(verifyJWT, unfollowUser);

// OAuth Route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `https://${process.env.FRONTEND_URL}/sign-in`,
    session: false,
  }),
  (req, res) => {
    const { accessToken, refreshToken } = req.authInfo;
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };

    res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .redirect(`https://${process.env.FRONTEND_URL}/success`);
  }
);

export default router;
