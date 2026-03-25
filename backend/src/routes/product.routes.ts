import { Router } from "express";
import * as ProductController from "../controllers/product.controller";

const router = Router();

// PUBLIC PRODUCT ROUTES
router.get("/", ProductController.getAllProducts);
router.get("/featured", ProductController.getFeaturedProducts);
router.get("/:slug", ProductController.getProductBySlug);

// CATEGORY ROUTES
router.get("/categories", ProductController.getAllCategories);
router.get("/categories/:slug", ProductController.getCategoryBySlug);

// ADMIN DASHBOARD ROUTES
router.post("/", ProductController.createProduct); // For now it's direct, but ideally protected

export default router;
