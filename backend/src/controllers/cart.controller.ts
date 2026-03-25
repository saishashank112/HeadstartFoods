import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { prisma } from "../config/db";
import { serialize } from "../utils/serialization";

// GET /api/cart
export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id ? BigInt(req.user.id) : null;
    const sessionId = req.headers["x-session-id"]?.toString() || "";

    const cart = await prisma.cartItem.findMany({
      where: userId ? { user_id: userId } : { session_id: sessionId },
      include: {
        variant: {
          include: { product: true },
        },
      },
    });

    res.status(200).json(serialize(cart));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/cart/items
export const addItem = async (req: AuthRequest, res: Response) => {
  try {
    const { variant_id, quantity = 1 } = req.body;
    const userId = req.user?.id ? BigInt(req.user.id) : null;
    const sessionId = req.headers["x-session-id"]?.toString() || "temp-session";

    const where = userId ? { user_id: userId, variant_id: BigInt(variant_id) } : { session_id: sessionId, variant_id: BigInt(variant_id) };

    const existingItem = await prisma.cartItem.findFirst({ where });

    if (existingItem) {
      const updated = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
      return res.status(200).json(serialize(updated));
    }

    const item = await prisma.cartItem.create({
      data: {
        user_id: userId,
        session_id: sessionId,
        variant_id: BigInt(variant_id),
        quantity,
      },
    });

    res.status(201).json(serialize(item));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/cart/items/:id
export const updateItem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const updated = await prisma.cartItem.update({
      where: { id: BigInt(id) },
      data: { quantity },
    });

    res.status(200).json(serialize(updated));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/cart/items/:id
export const removeItem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.cartItem.delete({
      where: { id: BigInt(id) },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/cart
export const clearCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id ? BigInt(req.user.id) : null;
    const sessionId = req.headers["x-session-id"]?.toString() || "";

    await prisma.cartItem.deleteMany({
      where: userId ? { user_id: userId } : { session_id: sessionId },
    });

    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
