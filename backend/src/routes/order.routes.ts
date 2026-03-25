import { Router } from "express";
import * as OrderController from "../controllers/order.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// PUBLIC/GUEST (with session or email)
router.post("/checkout", OrderController.createOrder); // Handles guest or auth
router.get("/track/:id", OrderController.getOrderById);

// AUTHENTICATED
router.get("/me", authenticate, OrderController.getMyOrders);
router.get("/:id", authenticate, OrderController.getOrderById);

export default router;
