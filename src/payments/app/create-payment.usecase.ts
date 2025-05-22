import { Injectable, Logger } from '@nestjs/common';
import { FindLoanByIdUseCase } from 'src/loans/app/usecases';
import { PaymentInvalidAmountError } from '../domain/exceptions/payment-invalid-amount.error';
import { CreatePaymentInput } from '../domain/inputs';
import { Payment } from '../domain/models';
import { CreatePaymentService } from '../domain/services';

@Injectable()
export class CreatePaymentUseCase {
  private readonly logger: Logger = new Logger(CreatePaymentUseCase.name);

  constructor(
    private readonly createPaymentService: CreatePaymentService,
    private readonly findLoanByIdUseCase: FindLoanByIdUseCase,
  ) {}

  async execute(input: CreatePaymentInput): Promise<Payment> {
    await this.findLoanByIdUseCase.execute(input.loanId);

    if (input.amount <= 0) {
      throw new PaymentInvalidAmountError({ amount: input.amount });
    }

    return await this.createPaymentService.execute(input);
  }
}
