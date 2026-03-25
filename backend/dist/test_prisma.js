"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./config/db");
async function main() {
    await db_1.prisma.$transaction(async (tx) => {
        // Check if models exist on tx
        console.log("address:", !!tx.address);
        console.log("order:", !!tx.order);
        console.log("productVariant:", !!tx.productVariant);
    });
}
main().catch(console.error).finally(() => db_1.prisma.$disconnect());
