import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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
  } else {
    const hashedPassword = await bcrypt.hash("admin123", 10);
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
