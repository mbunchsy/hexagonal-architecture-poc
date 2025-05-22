import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { FindLoanByIdUseCase } from './app/usecases';
import { LoansRepository } from './domain/repositories';
import { PrismaLoansRepository } from './infrastructure/repositories/prisma-loans.repository';

@Module({
  providers: [
    //usecases
    FindLoanByIdUseCase,
    //repositories
    { provide: LoansRepository, useClass: PrismaLoansRepository },
  ],
  imports: [PrismaModule],
  exports: [FindLoanByIdUseCase],
})
export class LoansModule {}
