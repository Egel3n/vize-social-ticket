import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const turkiye = await prisma.country.upsert({
    where: { name: "Türkiye" },
    update: {},
    create: {
      name: "Türkiye",
      cities: {
        create: [{ name: "İstanbul" }, { name: "Ankara" }, { name: "İzmir" }],
      },
    },
  });

  const germany = await prisma.country.upsert({
    where: { name: "Germany" },
    update: {},
    create: {
      name: "Germany",
      cities: {
        create: [{ name: "Berlin" }, { name: "Munich" }, { name: "Hamburg" }],
      },
    },
  });

  console.log({ turkiye, germany });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
