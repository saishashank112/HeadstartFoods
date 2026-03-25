import { Request, Response } from "express";
import { prisma } from "../config/db";
import { serialize } from "../utils/serialization";

// GET /api/products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { category, origin, minPrice, maxPrice, inStock, featured, limit = 10, offset = 0, sort = "newest" } = req.query;

    const where: any = {
      is_active: true,
    };

    if (category) {
      where.category = { slug: category.toString() };
    }
    if (origin) {
      where.origin = origin.toString();
    }
    if (featured === "true") {
      where.is_featured = true;
    }
    if (inStock === "true") {
      where.variants = { some: { stock_quantity: { gt: 0 } } };
    }

    // Price filtering (simplified for retail_price)
    if (minPrice || maxPrice) {
      where.variants = {
        ...where.variants,
        some: {
          ...where.variants?.some,
          retail_price: {
            gte: minPrice ? parseFloat(minPrice.toString()) : undefined,
            lte: maxPrice ? parseFloat(maxPrice.toString()) : undefined,
          },
        },
      };
    }

    let orderBy: any = { created_at: "desc" };
    if (sort === "price-low") orderBy = { variants: { _count: "desc" } }; // Simplified, actually it's more complex with Prisma to sort by variant price
    if (sort === "price-high") orderBy = { variants: { _count: "desc" } }; // Simplified

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        variants: {
          where: { is_active: true },
        },
        images: {
          orderBy: { sort_order: "asc" },
        },
      },
      take: parseInt(limit.toString()),
      skip: parseInt(offset.toString()),
      orderBy,
    });

    const total = await prisma.product.count({ where });

    res.status(200).json(serialize({ products, total, limit, offset }));
  } catch (error: any) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET /api/products/featured
export const getFeaturedProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: { is_active: true, is_featured: true },
      include: {
        category: true,
        variants: true,
        images: {
          where: { is_primary: true },
        },
      },
      take: 8,
    });
    res.status(200).json(serialize(products));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/products/:slug
export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        variants: {
          include: { wholesale_tiers: true },
        },
        images: { orderBy: { sort_order: "asc" } },
        traceability: true,
      },
    });

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json(serialize(product));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/categories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      where: { is_active: true },
      include: { children: true },
      orderBy: { sort_order: "asc" },
    });
    res.status(200).json(serialize(categories));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/categories/:slug
export const getCategoryBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          where: { is_active: true },
          include: {
            variants: true,
            images: { where: { is_primary: true } },
          },
        },
      },
    });

    if (!category) return res.status(404).json({ error: "Category not found" });

    res.status(200).json(serialize(category));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
// POST /api/products
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, category_id, price_cents, image_url, seasonality, description, origin, certifications } = req.body;

    // Basic slug generation
    const baseSlug = name.toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        category_id: BigInt(category_id),
        description: description || `Premium ${name} imported weekly from the finest orchards.`,
        origin: origin || "India",
        is_active: true,
        is_featured: false,
        variants: {
          create: {
            sku: `${baseSlug.toUpperCase().slice(0, 4)}-${Math.floor(Math.random() * 1000)}`,
            name: "Standard Pack",
            retail_price: (price_cents || 2999) / 100,
            stock_quantity: 10, // Initial stock
            is_active: true
          }
        },
        images: image_url ? {
          create: {
            url: image_url,
            alt_text: name,
            is_primary: true,
            sort_order: 0
          }
        } : undefined
      },
      include: {
        category: true,
        variants: true,
        images: true
      }
    });

    res.status(201).json(serialize(product));
  } catch (error: any) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product: " + error.message });
  }
};
