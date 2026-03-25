"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const schema = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

enum Role {
  customer
  retailer
  admin
}

enum Status {
  active
  pending
  suspended
}

enum AddressType {
  shipping
  billing
}

enum OrderStatus {
  pending
  processing
  shipped
  delivered
  cancelled
  refunded
}

enum OrderType {
  retail
  wholesale
}

enum PaymentMethod {
  stripe
  paypal
  apple_pay
  google_pay
}

enum ShippingMethod {
  standard
  express
  local_pickup
}

enum InquiryType {
  general
  wholesale
  support
  partnership
}

enum InquiryStatus {
  new
  read
  responded
}

model User {
  id              BigInt    @id @default(autoincrement())
  email           String    @unique
  password_hash  String?   @db.VarChar(255)
  role            Role      @default(customer)
  first_name      String?   @db.VarChar(100)
  last_name       String?   @db.VarChar(100)
  company_name    String?   @db.VarChar(255)
  gst_number      String?   @db.VarChar(20)
  phone           String?   @db.VarChar(20)
  status          Status    @default(pending)
  email_verified  Boolean   @default(false)
  created_at      DateTime  @default(now())
  updated_at      DateTime  @updatedAt

  addresses       Address[]
  orders          Order[]
  cart_items      CartItem[]

  @@map("users")
}

model Address {
  id              BigInt      @id @default(autoincrement())
  user_id         BigInt
  user            User        @relation(fields: [user_id], references: [id])
  type            AddressType
  full_name       String
  street_1        String
  street_2        String?
  city            String
  province        String      @db.VarChar(2)
  postal_code     String
  country         String      @default("CA")
  is_default      Boolean     @default(false)

  orders          Order[]     @relation("ShippingAddress")

  @@map("addresses")
}

model Category {
  id              BigInt     @id @default(autoincrement())
  name            String
  slug            String     @unique
  description     String?    @db.Text
  image_url       String?
  parent_id       BigInt?
  parent          Category?  @relation("CategoryParent", fields: [parent_id], references: [id])
  children        Category[] @relation("CategoryParent")
  sort_order      Int        @default(0)
  is_active       Boolean    @default(true)

  products        Product[]

  @@map("categories")
}

model Product {
  id                  BigInt        @id @default(autoincrement())
  category_id         BigInt
  category            Category      @relation(fields: [category_id], references: [id])
  name                String
  slug                String        @unique
  description         String?       @db.Text
  origin              String?       @db.VarChar(255)
  certifications_json Json?
  shelf_life_days     Int?
  storage_instructions String?      @db.Text
  is_active           Boolean       @default(true)
  is_featured         Boolean       @default(false)
  created_at          DateTime      @default(now())
  updated_at          DateTime      @updatedAt

  variants            ProductVariant[]
  images              ProductImage[]
  traceability        Traceability[]

  @@map("products")
}

model ProductVariant {
  id              BigInt           @id @default(autoincrement())
  product_id      BigInt
  product         Product          @relation(fields: [product_id], references: [id])
  sku             String           @unique
  name            String
  weight          Decimal?         @db.Decimal(10, 2)
  unit            String?          @db.VarChar(50)
  retail_price    Decimal          @db.Decimal(10, 2)
  stock_quantity  Int              @default(0)
  is_active       Boolean          @default(true)

  wholesale_tiers WholesaleTier[]
  order_items     OrderItem[]
  cart_items      CartItem[]

  @@map("product_variants")
}

model WholesaleTier {
  id              BigInt         @id @default(autoincrement())
  variant_id      BigInt
  variant         ProductVariant @relation(fields: [variant_id], references: [id])
  min_qty         Int
  max_qty         Int?
  unit_price      Decimal        @db.Decimal(10, 2)
  moq             Int            @default(1)

  @@map("wholesale_tiers")
}

model ProductImage {
  id              BigInt     @id @default(autoincrement())
  product_id      BigInt
  product         Product    @relation(fields: [product_id], references: [id])
  url             String
  alt_text        String?
  sort_order      Int        @default(0)
  is_primary      Boolean    @default(false)

  @@map("product_images")
}

model Order {
  id                  BigInt         @id @default(autoincrement())
  user_id             BigInt?
  user                User?          @relation(fields: [user_id], references: [id])
  guest_email         String?
  status              OrderStatus    @default(pending)
  order_type          OrderType      @default(retail)
  subtotal            Decimal        @db.Decimal(10, 2)
  tax_amount          Decimal        @db.Decimal(10, 2)
  shipping_amount     Decimal        @db.Decimal(10, 2)
  discount_amount     Decimal        @db.Decimal(10, 2) @default(0)
  total               Decimal        @db.Decimal(10, 2)
  shipping_address_id BigInt
  shipping_address    Address        @relation("ShippingAddress", fields: [shipping_address_id], references: [id])
  payment_method      PaymentMethod
  payment_intent_id   String?
  shipping_method     ShippingMethod
  notes               String?        @db.Text
  created_at          DateTime       @default(now())
  updated_at          DateTime       @updatedAt

  items               OrderItem[]

  @@map("orders")
}

model OrderItem {
  id              BigInt         @id @default(autoincrement())
  order_id        BigInt
  order           Order          @relation(fields: [order_id], references: [id])
  variant_id      BigInt
  variant         ProductVariant @relation(fields: [variant_id], references: [id])
  quantity        Int
  unit_price      Decimal        @db.Decimal(10, 2)
  total_price     Decimal        @db.Decimal(10, 2)
  is_wholesale    Boolean        @default(false)

  @@map("order_items")
}

model TaxRate {
  id              BigInt   @id @default(autoincrement())
  province_code   String   @unique @db.VarChar(2)
  province_name   String   @db.VarChar(100)
  gst_rate        Decimal  @db.Decimal(5, 4) @default(0)
  pst_rate        Decimal  @db.Decimal(5, 4) @default(0)
  hst_rate        Decimal  @db.Decimal(5, 4) @default(0)
  effective_date  DateTime @default(now())

  @@map("tax_rates")
}

model Traceability {
  id              BigInt   @id @default(autoincrement())
  product_id      BigInt
  product         Product  @relation(fields: [product_id], references: [id])
  batch_code      String   @unique
  orchard         String?
  harvest_date    DateTime?
  export_date     DateTime?
  fssai_cert_number String?
  cfia_clearance_date DateTime?
  cfia_entry_number String?
  warehouse_arrival DateTime?
  temperature_log_url String?

  @@map("traceability")
}

model Inquiry {
  id              BigInt        @id @default(autoincrement())
  name            String
  email           String
  phone           String?
  company_name    String?       @db.VarChar(255)
  volume_interest String?       @db.VarChar(100)
  location        String?       @db.VarChar(255)
  type            InquiryType   @default(general)
  subject         String
  message         String        @db.Text
  status          InquiryStatus @default(new)
  created_at      DateTime      @default(now())

  @@map("inquiries")
}

model Testimonial {
  id              BigInt  @id @default(autoincrement())
  retailer_name   String
  store_name      String?
  quote           String  @db.Text
  rating          Int     @default(5) @db.TinyInt
  logo_url        String?
  is_featured     Boolean @default(false)
  sort_order      Int     @default(0)

  @@map("testimonials")
}

model NewsletterSubscriber {
  id              BigInt   @id @default(autoincrement())
  email           String   @unique
  subscribed_at   DateTime @default(now())
  is_active       Boolean  @default(true)

  @@map("newsletter_subscribers")
}

model CartItem {
  id              BigInt         @id @default(autoincrement())
  user_id         BigInt?
  user            User?          @relation(fields: [user_id], references: [id])
  session_id      String?        @db.VarChar(255)
  variant_id      BigInt
  variant         ProductVariant @relation(fields: [variant_id], references: [id])
  quantity        Int            @default(1)
  created_at      DateTime       @default(now())
  updated_at      DateTime       @updatedAt

  @@map("cart_items")
}
`;
fs_1.default.writeFileSync('prisma/schema.prisma', schema, 'utf8');
console.log('✅ schema.prisma written as UTF-8');
