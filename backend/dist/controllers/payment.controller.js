"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.capturePayPalOrder = exports.createPayPalOrder = exports.stripeWebhook = exports.createStripeIntent = void 0;
const stripe_1 = __importDefault(require("stripe"));
const db_1 = require("../config/db");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2023-10-16",
});
// POST /api/payments/stripe/intent
const createStripeIntent = async (req, res) => {
    try {
        const { amount, currency = "cad", metadata } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Converted to cents
            currency,
            metadata,
            automatic_payment_methods: { enabled: true },
        });
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createStripeIntent = createStripeIntent;
// POST /api/payments/stripe/webhook
const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET || "");
    }
    catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle successful payment
    if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata.orderId;
        // Update order status logic here
        if (orderId) {
            await db_1.prisma.order.update({
                where: { id: BigInt(orderId) },
                data: { status: "processing" },
            });
        }
    }
    res.json({ received: true });
};
exports.stripeWebhook = stripeWebhook;
// PAYPAL (Simplified for now)
const createPayPalOrder = async (req, res) => {
    // Logic to call PayPal API via Axios with Client ID/Secret
    res.status(200).json({ message: "PayPal order creation placeholder" });
};
exports.createPayPalOrder = createPayPalOrder;
const capturePayPalOrder = async (req, res) => {
    res.status(200).json({ message: "PayPal capture placeholder" });
};
exports.capturePayPalOrder = capturePayPalOrder;
