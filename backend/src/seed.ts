import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const predefinedItems = [
    { name: 'User' },
    { name: 'Role' },
    { name: 'Model3' },
    { name: 'Model4' },
    { name: 'Model5' },
  ];

  for (const item of predefinedItems) {
    await prisma.item.create({
      data: item,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
