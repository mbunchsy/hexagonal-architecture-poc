import { CreatePaymentWithStatusInput } from '../inputs';
import { Payment } from '../models';

export interface PaymentsRepository {
  findAll(): Promise<Payment[]>;
  create(input: CreatePaymentWithStatusInput): Promise<Payment>;
}

export const PaymentsRepository = 'PaymentsRepository';
