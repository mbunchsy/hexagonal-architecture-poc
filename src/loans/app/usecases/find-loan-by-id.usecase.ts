import { Inject, Injectable, Logger } from '@nestjs/common';
import { LoanNotFoundError } from 'src/loans/domain/exceptions/loan-not-found.error';
import { Loan } from 'src/loans/domain/models';
import { LoansRepository } from 'src/loans/domain/repositories/loans.repository';

@Injectable()
export class FindLoanByIdUseCase {
  private readonly logger: Logger = new Logger(FindLoanByIdUseCase.name);

  constructor(
    @Inject(LoansRepository)
    private readonly loansRepository: LoansRepository,
  ) {}

  async execute(id: string): Promise<Loan | null> {
    const loan = await this.loansRepository.findById(id);

    if (!loan) {
      throw new LoanNotFoundError({ id });
    }

    return loan;
  }
}
