import express from 'express';
import { logout,login, register ,getuser, updateProfile,checkSession} from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import upload from '../utils/multer.js';

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated,getuser);
router.route("/profile/update").put(isAuthenticated,upload.single("profilePhoto"),updateProfile);
router.route("/session").get(checkSession);
export default router;