import { Injectable } from '@nestjs/common';
import { Loan as LoanPrisma } from '@prisma/client';
import { Loan } from 'src/loans/domain/models';
import { LoansRepository } from 'src/loans/domain/repositories';
import { PrismaService } from 'src/prisma';

@Injectable()
export class PrismaLoansRepository implements LoansRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Loan | null> {
    const result = await this.prisma.loan.findUnique({
      where: {
        id,
      },
    });

    if (!result) {
      return null;
    }

    return toLoanDomain(result);
  }
}

function toLoanDomain(loan: LoanPrisma): Loan {
  return {
    id: loan.id,
    principalAmount: loan.principal_amount,
    interestRate: loan.interest_rate,
    termInMonths: loan.term_in_months,
    startDate: loan.start_date,
    dueDay: loan.due_day,
    remainingDebt: loan.remaining_debt,
    createdAt: loan.created_at,
  };
}
