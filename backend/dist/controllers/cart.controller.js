"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeItem = exports.updateItem = exports.addItem = exports.getCart = void 0;
const db_1 = require("../config/db");
const serialization_1 = require("../utils/serialization");
// GET /api/cart
const getCart = async (req, res) => {
    try {
        const userId = req.user?.id ? BigInt(req.user.id) : null;
        const sessionId = req.headers["x-session-id"]?.toString() || "";
        const cart = await db_1.prisma.cartItem.findMany({
            where: userId ? { user_id: userId } : { session_id: sessionId },
            include: {
                variant: {
                    include: { product: true },
                },
            },
        });
        res.status(200).json((0, serialization_1.serialize)(cart));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getCart = getCart;
// POST /api/cart/items
const addItem = async (req, res) => {
    try {
        const { variant_id, quantity = 1 } = req.body;
        const userId = req.user?.id ? BigInt(req.user.id) : null;
        const sessionId = req.headers["x-session-id"]?.toString() || "temp-session";
        const where = userId ? { user_id: userId, variant_id: BigInt(variant_id) } : { session_id: sessionId, variant_id: BigInt(variant_id) };
        const existingItem = await db_1.prisma.cartItem.findFirst({ where });
        if (existingItem) {
            const updated = await db_1.prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            });
            return res.status(200).json((0, serialization_1.serialize)(updated));
        }
        const item = await db_1.prisma.cartItem.create({
            data: {
                user_id: userId,
                session_id: sessionId,
                variant_id: BigInt(variant_id),
                quantity,
            },
        });
        res.status(201).json((0, serialization_1.serialize)(item));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.addItem = addItem;
// PUT /api/cart/items/:id
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const updated = await db_1.prisma.cartItem.update({
            where: { id: BigInt(id) },
            data: { quantity },
        });
        res.status(200).json((0, serialization_1.serialize)(updated));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateItem = updateItem;
// DELETE /api/cart/items/:id
const removeItem = async (req, res) => {
    try {
        const { id } = req.params;
        await db_1.prisma.cartItem.delete({
            where: { id: BigInt(id) },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.removeItem = removeItem;
// DELETE /api/cart
const clearCart = async (req, res) => {
    try {
        const userId = req.user?.id ? BigInt(req.user.id) : null;
        const sessionId = req.headers["x-session-id"]?.toString() || "";
        await db_1.prisma.cartItem.deleteMany({
            where: userId ? { user_id: userId } : { session_id: sessionId },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.clearCart = clearCart;
