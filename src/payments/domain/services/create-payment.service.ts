import { Inject, Injectable } from '@nestjs/common';
import { PaymentsRepository } from 'src/payments/domain/repositories/payments.repository';
import { CreatePaymentInput, CreatePaymentWithStatusInput } from '../inputs';

@Injectable()
export class CreatePaymentService {
  constructor(
    @Inject(PaymentsRepository)
    private readonly paymentsRepository: PaymentsRepository,
  ) {}

  execute(input: CreatePaymentInput) {
    const data = this.toBuild(input);

    return this.paymentsRepository.create(data);
  }

  private toBuild(input: CreatePaymentInput): CreatePaymentWithStatusInput {
    return {
      ...input,
      status: this.calculateStatus(),
    };
  }

  private calculateStatus(): string {
    return 'PENDING';
  }
}
