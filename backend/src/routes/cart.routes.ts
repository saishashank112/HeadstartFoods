import { Router } from "express";
import * as CartController from "../controllers/cart.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Routes for cart, public but will handle auth if token provided
router.get("/", CartController.getCart);
router.post("/items", CartController.addItem);
router.put("/items/:id", CartController.updateItem);
router.delete("/items/:id", CartController.removeItem);
router.delete("/", CartController.clearCart);

export default router;
