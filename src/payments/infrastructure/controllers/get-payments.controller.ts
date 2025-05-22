import { Controller, Get } from '@nestjs/common';
import { FindAllPaymentsUseCase } from 'src/payments/app/find-all-payments.usecase';
import { PaymentPresenter, toPaymentPresenter } from '../presenters';

@Controller('payments')
export class GetPaymentsController {
  constructor(
    private readonly findAllPaymentsUseCase: FindAllPaymentsUseCase,
  ) {}

  @Get()
  async findAll(): Promise<PaymentPresenter[]> {
    const response = await this.findAllPaymentsUseCase.execute();
    return response.map(toPaymentPresenter);
  }
}
