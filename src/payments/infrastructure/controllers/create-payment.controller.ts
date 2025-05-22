import { Body, Controller, Post } from '@nestjs/common';
import { CreatePaymentUseCase } from 'src/payments/app/create-payment.usecase';
import { CreatePaymentDto } from '../dtos';
import { PaymentPresenter, toPaymentPresenter } from '../presenters';

@Controller('payments')
export class CreatePaymentController {
  constructor(private readonly createPaymentUseCase: CreatePaymentUseCase) {}

  @Post()
  async create(@Body() input: CreatePaymentDto): Promise<PaymentPresenter> {
    const response = await this.createPaymentUseCase.execute(input.toDomain());
    return toPaymentPresenter(response);
  }
}
