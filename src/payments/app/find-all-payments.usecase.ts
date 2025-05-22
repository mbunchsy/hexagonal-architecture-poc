import { Inject, Injectable, Logger } from '@nestjs/common';
import { PaymentsRepository } from 'src/payments/domain/repositories/payments.repository';

@Injectable()
export class FindAllPaymentsUseCase {
  private readonly logger: Logger = new Logger(FindAllPaymentsUseCase.name);

  constructor(
    @Inject(PaymentsRepository)
    private readonly paymentsRepository: PaymentsRepository,
  ) {}

  async execute() {
    return await this.paymentsRepository.findAll();
  }
}
