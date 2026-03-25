"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../config/db");
const serialization_1 = require("../utils/serialization");
const email_service_1 = require("../services/email.service");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const dir = "public/uploads";
        if (!fs_1.default.existsSync(dir))
            fs_1.default.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        cb(null, `image_${Date.now()}${ext}`);
    }
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
// POST /api/upload
router.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file)
        return res.status(400).json({ error: "No file uploaded" });
    res.status(200).json({ url: `/uploads/${req.file.filename}` });
});
// GET /api/tax/:provinceCode
router.get("/tax/:provinceCode", async (req, res) => {
    try {
        const { provinceCode } = req.params;
        const rate = await db_1.prisma.taxRate.findUnique({
            where: { province_code: provinceCode.toUpperCase() },
        });
        if (!rate)
            return res.status(404).json({ error: "Province not found" });
        res.status(200).json((0, serialization_1.serialize)(rate));
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ error: message });
    }
});
// POST /api/inquiries
router.post("/inquiries", async (req, res) => {
    try {
        const { name, email, phone, type, subject, message, company_name, volume_interest, location } = req.body;
        const inquiry = await db_1.prisma.inquiry.create({
            data: { name, email, phone, type, subject, message, company_name, volume_interest, location },
        });
        // Notify admin
        email_service_1.emailService.sendWholesaleInquiryNotification(inquiry).catch(console.error);
        res.status(201).json((0, serialization_1.serialize)(inquiry));
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ error: message });
    }
});
// POST /api/newsletter/subscribe
router.post("/newsletter/subscribe", async (req, res) => {
    try {
        const { email } = req.body;
        const subscriber = await db_1.prisma.newsletterSubscriber.upsert({
            where: { email },
            update: { is_active: true },
            create: { email },
        });
        res.status(201).json((0, serialization_1.serialize)(subscriber));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// GET /api/traceability/:batchCode
router.get("/traceability/:batchCode", async (req, res) => {
    try {
        const { batchCode } = req.params;
        const record = await db_1.prisma.traceability.findUnique({
            where: { batch_code: batchCode },
            include: { product: true },
        });
        if (!record)
            return res.status(404).json({ error: "Batch not found" });
        res.status(200).json((0, serialization_1.serialize)(record));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
