import { Module } from '@nestjs/common';
import { LoansModule } from 'src/loans/loans.module';
import { PrismaModule } from 'src/prisma';
import { CreatePaymentUseCase } from './app/create-payment.usecase';
import { FindAllPaymentsUseCase } from './app/find-all-payments.usecase';
import { PaymentsRepository } from './domain/repositories/payments.repository';
import { CreatePaymentService } from './domain/services';
import { CreatePaymentController } from './infrastructure/controllers/create-payment.controller';
import { GetPaymentsController } from './infrastructure/controllers/get-payments.controller';
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
  imports: [PrismaModule, LoansModule],
  controllers: [GetPaymentsController, CreatePaymentController],
})
export class PaymentsModule {}
