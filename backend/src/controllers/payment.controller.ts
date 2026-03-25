import { Request, Response } from "express";
import Stripe from "stripe";
import { prisma } from "../config/db";
import { serialize } from "../utils/serialization";
import axios from "axios";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16" as any,
});

// POST /api/payments/stripe/intent
export const createStripeIntent = async (req: Request, res: Response) => {
  try {
    const { amount, currency = "cad", metadata } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Converted to cents
      currency,
      metadata,
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/payments/stripe/webhook
export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const orderId = paymentIntent.metadata.orderId;
    
    // Update order status logic here
    if (orderId) {
      await prisma.order.update({
        where: { id: BigInt(orderId) },
        data: { status: "processing" },
      });
    }
  }

  res.json({ received: true });
};

// PAYPAL (Simplified for now)
export const createPayPalOrder = async (req: Request, res: Response) => {
  // Logic to call PayPal API via Axios with Client ID/Secret
  res.status(200).json({ message: "PayPal order creation placeholder" });
};

export const capturePayPalOrder = async (req: Request, res: Response) => {
  res.status(200).json({ message: "PayPal capture placeholder" });
};
