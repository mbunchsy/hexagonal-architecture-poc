import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    const loan1 = await tx.loan.create({
      data: {
        principal_amount: 1000,
        interest_rate: 0.05,
        term_in_months: 12,
        start_date: new Date('2025-06-01'),
        due_day: 5,
        remaining_debt: 1000,
      },
    });

    const loan2 = await tx.loan.create({
      data: {
        principal_amount: 1500,
        interest_rate: 0.07,
        term_in_months: 6,
        start_date: new Date('2025-06-15'),
        due_day: 10,
        remaining_debt: 1500,
      },
    });

    const loan3 = await tx.loan.create({
      data: {
        principal_amount: 500,
        interest_rate: 0.1,
        term_in_months: 3,
        start_date: new Date('2025-07-01'),
        due_day: 1,
        remaining_debt: 500,
      },
    });

    const payments = await Promise.all([
      tx.payment.create({
        data: {
          loan_id: loan1.id,
          amount: 100,
          status: 'COMPLETED',
        },
      }),
      tx.payment.create({
        data: {
          loan_id: loan2.id,
          amount: 250,
          status: 'PENDING',
        },
      }),
      tx.payment.create({
        data: {
          loan_id: loan3.id,
          amount: 100,
          status: 'FAILED',
        },
      }),
    ]);

    console.log('Loans and payments seeded:', {
      loans: [loan1, loan2, loan3],
      payments,
    });
  });
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
