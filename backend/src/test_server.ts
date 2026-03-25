import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

console.log("🥭 HEADSTART BACKEND: BOOTSTRAPPING...");

// Routes imports
import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.routes";
import cartRoutes from "./routes/cart.routes";
import utilityRoutes from "./routes/utility.routes";
import orderRoutes from "./routes/order.routes";
import paymentRoutes from "./routes/payment.routes";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// GLOBAL MIDDLEWARE
console.log("CORS Origin Allowed:", process.env.FRONTEND_URL || "http://localhost:3000");
app.use(helmet());
app.use(cors({
  origin: true, // Let it reflect the request origin for now to bypass
  credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// ROUTES
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments/stripe/webhook", express.raw({ type: "application/json" }));
app.use("/api/payments", paymentRoutes);
app.use("/api", utilityRoutes);

// RATE LIMITING
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use("/api", limiter);

// HEALTH CHECK
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// BASE API ROUTE
app.get("/", (req: Request, res: Response) => {
  res.send("Headstart Foods API is running...");
});

// START SERVER
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    console.log("Starting server on port...", PORT);
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`🔗 CORS Origin: ${process.env.FRONTEND_URL || "http://localhost:3002"}`);
    });
    
    // Lazy connect to DB
    prisma.$connect()
      .then(() => console.log("✅ Database Connected"))
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        console.error("❌ Database Connection Failed:", msg);
      });

  } catch (error: unknown) {
    console.error("💥 FAILED TO START SERVER:", error);
  }
};

start();
