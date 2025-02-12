import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.user.deleteMany({});

  // Create sample users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "john@example.com",
        name: "John Doe",
        birthDate: new Date("1990-01-15T00:00:00Z"),
        phoneNumber: "+1234567890",
        isActive: true,
        role: "ADMIN",
        notifyByEmail: true,
        bio: "Full-stack developer with a passion for building great user experiences",
        theme: "SYSTEM",
      },
    }),
    prisma.user.create({
      data: {
        email: "jane@example.com",
        name: "Jane Smith",
        birthDate: null, // Example with null date
        phoneNumber: null, // Example with null phone
        isActive: true,
        role: "EDITOR",
        notifyByEmail: false,
        bio: null, // Example with null bio
        theme: "DARK",
      },
    }),
  ]);

  console.log("Seeded database with users:", users);
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
