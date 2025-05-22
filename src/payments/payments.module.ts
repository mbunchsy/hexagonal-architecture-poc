import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { CreatePaymentUseCase } from './app/create-payment.usecase';
import { FindAllPaymentsUseCase } from './app/find-all-payments.usecase';
import { PaymentsRepository } from './domain/repositories/payments.repository';
import { CreatePaymentService } from './domain/services';
import { PaymentsController } from './infrastructure/controllers/payments.controller';
import { PrismaPaymentsRepository } from './infrastructure/reporitories/prisma-payments.repository';

@Module({
  providers: [
    //usecases
    FindAllPaymentsUseCase,
    CreatePaymentUseCase,
    //services
    CreatePaymentService,
    //repositories
    { provide: PaymentsRepository, useClass: PrismaPaymentsRepository },
  ],
  imports: [PrismaModule],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
