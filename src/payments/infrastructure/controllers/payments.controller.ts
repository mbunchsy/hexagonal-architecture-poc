import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePaymentUseCase } from 'src/payments/app/create-payment.usecase';
import { FindAllPaymentsUseCase } from 'src/payments/app/find-all-payments.usecase';
import { CreatePaymentDto } from '../dtos';
import { PaymentPresenter, toPaymentPresenter } from '../presenters';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly findAllPaymentsUseCase: FindAllPaymentsUseCase,
    private readonly createPaymentUseCase: CreatePaymentUseCase,
  ) {}

  @Get()
  async findAll(): Promise<PaymentPresenter[]> {
    const response = await this.findAllPaymentsUseCase.execute();
    return response.map(toPaymentPresenter);
  }

  @Post()
  async create(@Body() input: CreatePaymentDto): Promise<PaymentPresenter> {
    const response = await this.createPaymentUseCase.execute(input.toDomain());
    return toPaymentPresenter(response);
  }
}
