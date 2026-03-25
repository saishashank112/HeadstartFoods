import { Router } from "express";
import { prisma } from "../config/db";
import { serialize } from "../utils/serialization";
import { emailService } from "../services/email.service";
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "public/uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `image_${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

const router = Router();

// POST /api/upload
router.post("/upload", upload.single("file"), (req: any, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.status(200).json({ url: `/uploads/${req.file.filename}` });
});


// GET /api/tax/:provinceCode
router.get("/tax/:provinceCode", async (req, res) => {
  try {
    const { provinceCode } = req.params;
    const rate = await prisma.taxRate.findUnique({
      where: { province_code: provinceCode.toUpperCase() },
    });
    if (!rate) return res.status(404).json({ error: "Province not found" });
    res.status(200).json(serialize(rate));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: message });
  }
});

// POST /api/inquiries
router.post("/inquiries", async (req, res) => {
  try {
    const { name, email, phone, type, subject, message, company_name, volume_interest, location } = req.body;
    const inquiry = await prisma.inquiry.create({
      data: { name, email, phone, type, subject, message, company_name, volume_interest, location },
    });
    
    // Notify admin
    emailService.sendWholesaleInquiryNotification(inquiry).catch(console.error);

    res.status(201).json(serialize(inquiry));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: message });
  }
});

// POST /api/newsletter/subscribe
router.post("/newsletter/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { is_active: true },
      create: { email },
    });
    res.status(201).json(serialize(subscriber));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/traceability/:batchCode
router.get("/traceability/:batchCode", async (req, res) => {
  try {
    const { batchCode } = req.params;
    const record = await prisma.traceability.findUnique({
      where: { batch_code: batchCode },
      include: { product: true },
    });
    if (!record) return res.status(404).json({ error: "Batch not found" });
    res.status(200).json(serialize(record));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
