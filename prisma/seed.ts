// TODO: cant seem to use path aliases in this file
import { SEED_PROVERBS } from "../constants";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding proverbs... ⏳");
  await prisma.proverb.createMany({
    data: SEED_PROVERBS,
  });
  console.log("Seeded proverbs! ✅");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
