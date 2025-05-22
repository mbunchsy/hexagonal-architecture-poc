// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  await seedPayments();
}

// create several example payments
async function seedPayments() {
  // create several example payments
  const payments = await Promise.all([
    prisma.payment.create({
      data: {
        amount: 100.5,
        status: 'COMPLETED',
      },
    }),
    prisma.payment.create({
      data: {
        amount: 75.25,
        status: 'PENDING',
      },
    }),
    prisma.payment.create({
      data: {
        amount: 200.0,
        status: 'FAILED',
      },
    }),
  ]);

  console.log('Payments seeded:', payments);
}

// execute the main function
main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
