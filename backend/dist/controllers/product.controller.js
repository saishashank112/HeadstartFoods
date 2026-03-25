"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.getCategoryBySlug = exports.getAllCategories = exports.getProductBySlug = exports.getFeaturedProducts = exports.getAllProducts = void 0;
const db_1 = require("../config/db");
const serialization_1 = require("../utils/serialization");
// GET /api/products
const getAllProducts = async (req, res) => {
    try {
        const { category, origin, minPrice, maxPrice, inStock, featured, limit = 10, offset = 0, sort = "newest" } = req.query;
        const where = {
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
        let orderBy = { created_at: "desc" };
        if (sort === "price-low")
            orderBy = { variants: { _count: "desc" } }; // Simplified, actually it's more complex with Prisma to sort by variant price
        if (sort === "price-high")
            orderBy = { variants: { _count: "desc" } }; // Simplified
        const products = await db_1.prisma.product.findMany({
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
        const total = await db_1.prisma.product.count({ where });
        res.status(200).json((0, serialization_1.serialize)({ products, total, limit, offset }));
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getAllProducts = getAllProducts;
// GET /api/products/featured
const getFeaturedProducts = async (req, res) => {
    try {
        const products = await db_1.prisma.product.findMany({
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
        res.status(200).json((0, serialization_1.serialize)(products));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getFeaturedProducts = getFeaturedProducts;
// GET /api/products/:slug
const getProductBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await db_1.prisma.product.findUnique({
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
        if (!product)
            return res.status(404).json({ error: "Product not found" });
        res.status(200).json((0, serialization_1.serialize)(product));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getProductBySlug = getProductBySlug;
// GET /api/categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await db_1.prisma.category.findMany({
            where: { is_active: true },
            include: { children: true },
            orderBy: { sort_order: "asc" },
        });
        res.status(200).json((0, serialization_1.serialize)(categories));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllCategories = getAllCategories;
// GET /api/categories/:slug
const getCategoryBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await db_1.prisma.category.findUnique({
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
        if (!category)
            return res.status(404).json({ error: "Category not found" });
        res.status(200).json((0, serialization_1.serialize)(category));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getCategoryBySlug = getCategoryBySlug;
// POST /api/products
const createProduct = async (req, res) => {
    try {
        const { name, category_id, price_cents, image_url, seasonality, description, origin, certifications } = req.body;
        // Basic slug generation
        const baseSlug = name.toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
        const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
        const product = await db_1.prisma.product.create({
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
        res.status(201).json((0, serialization_1.serialize)(product));
    }
    catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product: " + error.message });
    }
};
exports.createProduct = createProduct;
