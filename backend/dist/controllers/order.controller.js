"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = exports.getMyOrders = exports.createOrder = void 0;
const db_1 = require("../config/db");
const serialization_1 = require("../utils/serialization");
const email_service_1 = require("../services/email.service");
// POST /api/orders/checkout
const createOrder = async (req, res) => {
    try {
        const { items, user_id, guest_email, shipping_address, payment_method, shipping_method, tax_amount, shipping_amount, discount_amount = 0, subtotal, total } = req.body;
        const userId = req.user?.id ? BigInt(req.user.id) : (user_id ? BigInt(user_id) : null);
        // Use transaction for atomic creation and stock decrement
        const result = await db_1.prisma.$transaction(async (tx) => {
            // Create shipping address
            const address = await tx.address.create({
                data: {
                    user_id: userId,
                    type: "shipping",
                    ...shipping_address,
                },
            });
            // Create the order
            const order = await tx.order.create({
                data: {
                    user_id: userId,
                    guest_email,
                    status: "pending",
                    order_type: "retail",
                    subtotal,
                    tax_amount,
                    shipping_amount,
                    discount_amount,
                    total,
                    shipping_address_id: address.id,
                    payment_method,
                    shipping_method,
                    items: {
                        create: items.map((item) => ({
                            variant_id: BigInt(item.variant_id),
                            quantity: item.quantity,
                            unit_price: item.unit_price,
                            total_price: item.total_price,
                            is_wholesale: item.is_wholesale || false,
                        })),
                    },
                },
                include: { items: true, shipping_address: true },
            });
            // Decrement stock for each variant
            for (const item of items) {
                await tx.productVariant.update({
                    where: { id: BigInt(item.variant_id) },
                    data: {
                        stock_quantity: {
                            decrement: item.quantity
                        }
                    }
                });
            }
            return order;
        });
        // Send email notification silently
        if (result.guest_email || result.user_id) {
            email_service_1.emailService.sendOrderConfirmation(result.guest_email || "customer@example.com", `SSA-${result.id}`, result.total.toString()).catch(console.error);
        }
        res.status(201).json((0, serialization_1.serialize)(result));
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ error: message });
    }
};
exports.createOrder = createOrder;
// GET /api/orders/me
const getMyOrders = async (req, res) => {
    try {
        const userId = BigInt(req.user.id);
        const orders = await db_1.prisma.order.findMany({
            where: { user_id: userId },
            include: { items: { include: { variant: { include: { product: true } } } } },
            orderBy: { created_at: "desc" },
        });
        res.status(200).json((0, serialization_1.serialize)(orders));
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ error: message });
    }
};
exports.getMyOrders = getMyOrders;
// GET /api/orders/:id
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await db_1.prisma.order.findUnique({
            where: { id: BigInt(id) },
            include: {
                items: { include: { variant: { include: { product: true } } } },
                shipping_address: true,
            },
        });
        if (!order)
            return res.status(404).json({ error: "Order not found" });
        res.status(200).json((0, serialization_1.serialize)(order));
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ error: message });
    }
};
exports.getOrderById = getOrderById;
