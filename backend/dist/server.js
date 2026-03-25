"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
// Routes imports
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const utility_routes_1 = __importDefault(require("./routes/utility.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// GLOBAL MIDDLEWARE
console.log("🥭 HEADSTART BACKEND: BOOTSTRAPPING...");
// CORS first to handle preflights
app.use((0, cors_1.default)({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use((0, compression_1.default)());
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "public/uploads")));
// ROUTES
app.use("/api/products", product_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/cart", cart_routes_1.default);
app.use("/api/orders", order_routes_1.default);
app.use("/api/payments/stripe/webhook", express_1.default.raw({ type: "application/json" }));
app.use("/api/payments", payment_routes_1.default);
app.use("/api", utility_routes_1.default);
// RATE LIMITING
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later."
});
app.use("/api", limiter);
// HEALTH CHECK
app.get("/health", (req, res) => {
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
            .catch((err) => {
            const msg = err instanceof Error ? err.message : String(err);
            console.error("❌ Database Connection Failed:", msg);
        });
    }
    catch (error) {
        console.error("💥 FAILED TO START SERVER:", error);
    }
};
start();
