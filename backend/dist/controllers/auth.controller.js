"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const serialization_1 = require("../utils/serialization");
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const JWT_EXPIRES_IN = "15m";
const JWT_REFRESH_EXPIRES_IN = "7d";
const register = async (req, res) => {
    try {
        const { email, password, first_name, last_name, role } = req.body;
        const existingUser = await db_1.prisma.user.findUnique({ where: { email } });
        if (existingUser)
            return res.status(400).json({ error: "Email already in use" });
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await db_1.prisma.user.create({
            data: {
                email,
                password_hash: hashedPassword,
                first_name,
                last_name,
                role: role === "retailer" ? "retailer" : "customer",
                status: "active", // Defaulting to active for now
            },
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id.toString(), role: user.role }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
        res.status(201).json((0, serialization_1.serialize)({
            message: "User created successfully",
            user,
            token // Added token here
        }));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db_1.prisma.user.findUnique({ where: { email } });
        if (!user || !user.password_hash) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!isMatch)
            return res.status(401).json({ error: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ id: user.id.toString(), role: user.role }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
        res.status(200).json((0, serialization_1.serialize)({ token, user }));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        if (!req.user)
            return res.status(401).json({ error: "Unauthorized" });
        const user = await db_1.prisma.user.findUnique({ where: { id: BigInt(req.user.id) } });
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.status(200).json((0, serialization_1.serialize)(user));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getMe = getMe;
