import { CannotProcessError } from 'src/shared/domain/errors';

export class PaymentInvalidAmountError extends CannotProcessError {
  constructor(data: { amount: number }) {
    super('Payment amount is invalid', data);
  }
}
