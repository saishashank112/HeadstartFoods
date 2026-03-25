import { Router } from "express";
import * as PaymentController from "../controllers/payment.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// STRIPE
router.post("/stripe/intent", PaymentController.createStripeIntent);
router.post("/stripe/webhook", PaymentController.stripeWebhook);

// PAYPAL
router.post("/paypal/create-order", PaymentController.createPayPalOrder);
router.post("/paypal/capture-order", PaymentController.capturePayPalOrder);

export default router;
