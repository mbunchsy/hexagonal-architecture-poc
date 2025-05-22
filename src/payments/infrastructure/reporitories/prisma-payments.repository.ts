import { Injectable } from '@nestjs/common';
import { Payment as PaymentPrisma } from '@prisma/client';
import { CreatePaymentWithStatusInput } from 'src/payments/domain/inputs';
import { Payment } from 'src/payments/domain/models';
import { PaymentsRepository } from 'src/payments/domain/repositories/payments.repository';
import { PrismaService, toNumber } from 'src/prisma';

@Injectable()
export class PrismaPaymentsRepository implements PaymentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Payment[]> {
    const result = await this.prisma.payment.findMany();

    return result.map(toPaymentDomain);
  }

  async create(input: CreatePaymentWithStatusInput): Promise<Payment> {
    const result = await this.prisma.payment.create({
      data: {
        amount: input.amount,
        status: input.status,
      },
    });

    return toPaymentDomain(result);
  }
}

export function toPaymentDomain(payment: PaymentPrisma): Payment {
  return {
    id: payment.id.toString(),
    amount: toNumber(payment.amount),
    status: payment.status,
    createdAt: payment.createdAt,
    updatedAt: payment.updatedAt,
  };
}
