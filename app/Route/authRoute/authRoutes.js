import express from "express";
import { register } from "../../controllers/index.js";
import {login,updateUser} from '../../controllers/authControllers/loginController.js'
import { authenticate } from "../../middlewares/authMiddleware.js";
import { upload } from "../../utils/cloudinary.js";

const router = express.Router();
router.post("/register", register);
// router.put("/updateuser",authenticate, updateUser);
router.put("/updateuser", authenticate, upload.single("profileImage"), updateUser);

router.post("/login", login);

export default router;


