import { prisma } from "./config/db";

async function main() {
  await prisma.$transaction(async (tx) => {
    // Check if models exist on tx
    console.log("address:", !!(tx as any).address);
    console.log("order:", !!(tx as any).order);
    console.log("productVariant:", !!(tx as any).productVariant);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
