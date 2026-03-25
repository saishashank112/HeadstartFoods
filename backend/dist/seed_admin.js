"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    const adminEmail = "admin@headstart.com";
    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail }
    });
    if (existingAdmin) {
        console.log("Admin user already exists:", adminEmail);
        // Update role just in case
        await prisma.user.update({
            where: { email: adminEmail },
            data: { role: "admin", status: "active" }
        });
        console.log("Admin role verified.");
    }
    else {
        const hashedPassword = await bcryptjs_1.default.hash("admin123", 10);
        await prisma.user.create({
            data: {
                email: adminEmail,
                password_hash: hashedPassword,
                first_name: "Headstart",
                last_name: "Admin",
                role: "admin",
                status: "active",
            }
        });
        console.log("Admin user created: email: admin@headstart.com, password: admin123");
    }
}
main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
