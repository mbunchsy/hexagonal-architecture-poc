import { Test } from '@nestjs/testing';
import { FindLoanByIdUseCase } from 'src/loans/app/usecases';
import { Loan } from 'src/loans/domain/models';
import { PaymentInvalidAmountError } from '../domain/exceptions/payment-invalid-amount.error';
import { CreatePaymentInput } from '../domain/inputs';
import { Payment } from '../domain/models';
import { CreatePaymentService } from '../domain/services';
import { CreatePaymentUseCase } from './create-payment.usecase';

describe('CreatePaymentUseCase', () => {
  let useCase: CreatePaymentUseCase;
  let createPaymentService: jest.Mocked<CreatePaymentService>;
  let findLoanByIdUseCase: jest.Mocked<FindLoanByIdUseCase>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreatePaymentUseCase,
        {
          provide: CreatePaymentService,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindLoanByIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = moduleRef.get<CreatePaymentUseCase>(CreatePaymentUseCase);
    createPaymentService = moduleRef.get(CreatePaymentService);
    findLoanByIdUseCase = moduleRef.get(FindLoanByIdUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const now = new Date();

  const mockLoan: Loan = {
    id: '1',
    principalAmount: 1000,
    interestRate: 0.05,
    termInMonths: 12,
    startDate: now,
    dueDay: 5,
    remainingDebt: 1000,
    createdAt: now,
  };

  const validPaymentInput: CreatePaymentInput = {
    loanId: '1',
    amount: 100,
  };

  describe('execute', () => {
    test('Should create payment when loan exists and amount is valid', async () => {
      const expectedPayment: Payment = {
        id: '1',
        loanId: '1',
        amount: 100,
        status: 'PENDING',
        createdAt: now,
        updatedAt: now,
      };

      findLoanByIdUseCase.execute.mockResolvedValue(mockLoan);
      createPaymentService.execute.mockResolvedValue(expectedPayment);

      const result = await useCase.execute(validPaymentInput);

      expect(result).toEqual(expectedPayment);
      expect(findLoanByIdUseCase.execute).toHaveBeenCalledWith('1');
      expect(createPaymentService.execute).toHaveBeenCalledWith(
        validPaymentInput,
      );
    });

    test('Should throw PaymentInvalidAmountError when amount is zero', async () => {
      const invalidInput: CreatePaymentInput = {
        ...validPaymentInput,
        amount: 0,
      };

      findLoanByIdUseCase.execute.mockResolvedValue(mockLoan);

      await expect(useCase.execute(invalidInput)).rejects.toThrow(
        PaymentInvalidAmountError,
      );

      expect(findLoanByIdUseCase.execute).toHaveBeenCalledWith('1');
      expect(createPaymentService.execute).not.toHaveBeenCalled();
    });

    test('Should throw PaymentInvalidAmountError when amount is negative', async () => {
      const invalidInput: CreatePaymentInput = {
        ...validPaymentInput,
        amount: -100,
      };

      findLoanByIdUseCase.execute.mockResolvedValue(mockLoan);

      await expect(useCase.execute(invalidInput)).rejects.toThrow(
        PaymentInvalidAmountError,
      );

      expect(findLoanByIdUseCase.execute).toHaveBeenCalledWith('1');
      expect(createPaymentService.execute).not.toHaveBeenCalled();
    });
  });
});
