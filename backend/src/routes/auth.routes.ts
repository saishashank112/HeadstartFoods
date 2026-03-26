import { Router } from "express";
import * as AuthController from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/admin/register", AuthController.adminRegister);
router.post("/admin/login", AuthController.adminLogin);
router.get("/me", authenticate, AuthController.getMe); 

export default router;
