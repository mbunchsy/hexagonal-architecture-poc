import { Payment } from 'src/payments/domain/models';

export class PaymentPresenter {
  id: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export function toPaymentPresenter(payment: Payment): PaymentPresenter {
  return {
    id: payment.id,
    amount: payment.amount,
    status: payment.status,
    createdAt: payment.createdAt,
    updatedAt: payment.updatedAt,
  };
}
