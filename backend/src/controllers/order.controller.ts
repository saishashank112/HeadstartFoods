import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { prisma } from "../config/db";
import { serialize } from "../utils/serialization";
import { Prisma } from "@prisma/client";
import { emailService } from "../services/email.service";

// POST /api/orders/checkout
export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { 
      items, 
      user_id, 
      guest_email, 
      shipping_address, 
      payment_method, 
      shipping_method,
      tax_amount,
      shipping_amount,
      discount_amount = 0,
      subtotal,
      total
    } = req.body;

    const userId = req.user?.id ? BigInt(req.user.id) : (user_id ? BigInt(user_id) : null);

    // Use transaction for atomic creation and stock decrement
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Create shipping address
      const address = await (tx as any).address.create({
        data: {
          user_id: userId as bigint,
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
            create: items.map((item: { variant_id: string; quantity: number; unit_price: number; total_price: number; is_wholesale?: boolean; }) => ({
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
        await (tx as any).productVariant.update({
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
       emailService.sendOrderConfirmation(
         result.guest_email || "customer@example.com", 
         `SSA-${result.id}`, 
         result.total.toString()
       ).catch(console.error);
    }

    res.status(201).json(serialize(result));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: message });
  }
};

// GET /api/orders/me
export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = BigInt(req.user!.id);
    const orders = await prisma.order.findMany({
      where: { user_id: userId },
      include: { items: { include: { variant: { include: { product: true } } } } },
      orderBy: { created_at: "desc" },
    });
    res.status(200).json(serialize(orders));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: message });
  }
};

// GET /api/orders/:id
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id: BigInt(id) },
      include: { 
        items: { include: { variant: { include: { product: true } } } },
        shipping_address: true,
      },
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(serialize(order));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: message });
  }
};
