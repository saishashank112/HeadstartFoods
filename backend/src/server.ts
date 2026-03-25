import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import path from "path";

dotenv.config();

// Routes imports
import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.routes";
import cartRoutes from "./routes/cart.routes";
import utilityRoutes from "./routes/utility.routes";
import orderRoutes from "./routes/order.routes";
import paymentRoutes from "./routes/payment.routes";

const app = express();
const prisma = new PrismaClient();

// GLOBAL MIDDLEWARE
console.log("🥭 HEADSTART BACKEND: BOOTSTRAPPING...");

// CORS first to handle preflights
app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(morgan("dev"));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(compression());
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

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
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Too many requests from this IP, please try again later."
});
app.use("/api", limiter);

// HEALTH CHECK
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// START SERVER
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
    
    // Lazy DB connect to prevent initial crash if DB is slow
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
