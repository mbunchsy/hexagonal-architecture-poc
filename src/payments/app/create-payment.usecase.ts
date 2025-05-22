import { Injectable, Logger } from '@nestjs/common';
import { CreatePaymentInput } from '../domain/inputs';
import { CreatePaymentService } from '../domain/services';

@Injectable()
export class CreatePaymentUseCase {
  private readonly logger: Logger = new Logger(CreatePaymentUseCase.name);

  constructor(private readonly createPaymentService: CreatePaymentService) {}

  async execute(input: CreatePaymentInput) {
    return await this.createPaymentService.execute(input);
  }
}
