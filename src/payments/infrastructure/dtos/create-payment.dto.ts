import { IsNumber, Min } from 'class-validator';
import { CreatePaymentInput } from 'src/payments/domain/inputs';

export class CreatePaymentDto {
  @IsNumber()
  @Min(0)
  amount: number;

  toDomain(): CreatePaymentInput {
    return {
      amount: this.amount,
    };
  }
}
