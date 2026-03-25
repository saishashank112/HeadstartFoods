# 🥭 Headstart Foods — Premium Perishables Importer

A complete, production-grade, full-stack eCommerce platform for **Headstart Foods Inc.**, a Surrey, BC-based importer specializing in premium Indian mangoes and South Asian groceries.

---

## 🚀 Technology Stack

### Frontend (Next.js 14)
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS (Custom HSL Token System)
- **Animations**: Framer Motion (Entrance & Layout Transitions)
- **Icons**: Lucide React
- **State**: Zustand (Cart & Auth Persist)
- **Forms**: React Hook Form + Zod
- **Carousel**: Embla Carousel

### Backend (Node.js/Express)
- **Runtime**: Node.js v18+
- **Database**: MySQL (hosted via Prisma ORM)
- **Security**: JWT Authentication, Bcrypt Hashing, Helmet, Rate Limiter
- **Middleware**: Morgan Logging, Compression, CORS
- **Payments**: Stripe Payment Intents & Webhooks, PayPal Order Capture
- **Utilities**: BigInt JSON Serialization, Singleton Prisma Client

---

## 🏗️ Core Architecture & Features

### 1. High-Performance B2C Shopping
- **Dynamic Catalogue**: Filter by origin, category, and price range.
- **King of Mangoes Experience**: Detailed product pages with variant pricing and seasonal availability badges.
- **Persistent Cart**: Unified guest and user session management.
- **Checkout Wizard**: Secure 3-step shipping and payment flow (Stripe/PayPal).

### 2. Institutional B2B Portal
- **Wholesale Intake**: High-conversion lead capture for Canadian retailers.
- **Tiered Pricing**: Automatic volume-based discount mapping.
- **Resource Center**: Access to FSSAI/CFIA compliance documentation and logistics guides.

### 3. Supply Chain Transparency
- **Batch Traceability**: Consumer-facing portal to lookup orchard harvest dates and flight cold-chain logs.
- **Compliance Shield**: Real-time verification of health certificates and inspection stamps.

### 4. Admin Command Center
- **Executive Dashboard**: KPIs for gross revenue, active order velocity, and partner inquiries.
- **Inventory Control**: Live SKU editing, stock monitoring, and perishability alerts.
- **Order Queue**: Direct management of fulfillment statuses (Pending -> In Transit -> Delivered).

---

## 🛠️ Installation & Setup

### 1. Prerequisites
- Node.js 18+
- MySQL Instance
- Stripe/PayPal API Keys

### 2. Backend Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

### 3. Frontend Setup
```bash
npm install
npm run dev
```

### 4. Environment Variables (.env)
Create a `.env` in the `backend/` directory:
```env
DATABASE_URL="mysql://USER:PASS@HOST:3306/headstarts"
JWT_SECRET="your_secret"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
PORT=5000
```

---

## 🥭 Design Language

- **Primary**: `#F97316` (Deep Mango Orange)
- **Navy**: `#0F172A` (Safety & Institutional Trust)
- **Gold**: `#EAB308` (Premium Grade Indicator)
- **Radius**: `1.5rem` (Modern, softened professional feel)
- **Typography**: `DM Sans` (Headlines) & `Inter` (UI/Body)

---

## 📄 License
© 2026 Headstart Foods Inc. All Rights Reserved. Engineered by **Antigravity**.
