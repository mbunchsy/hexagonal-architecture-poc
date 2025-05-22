import { LoanNotFoundError } from 'src/loans/domain/exceptions/loan-not-found.error';
import { Loan } from '../../../domain/models';
import { LoansRepository } from '../../../domain/repositories';
import { FindLoanByIdUseCase } from '../find-loan-by-id.usecase';

const mockFindById = jest.fn();
const mockRepository: jest.Mocked<LoansRepository> = {
  findById: mockFindById,
};

const mockLoan: Loan = {
  id: '1',
  principalAmount: 1000,
  interestRate: 0.05,
  termInMonths: 12,
  startDate: new Date('2025-06-01'),
  dueDay: 5,
  remainingDebt: 1000,
  createdAt: new Date(),
};

describe('FindLoanByIdUseCase', () => {
  let useCase: FindLoanByIdUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new FindLoanByIdUseCase(mockRepository);
  });

  test('Should find a loan by id', async () => {
    mockFindById.mockResolvedValue(mockLoan);

    const result = await useCase.execute('1');

    expect(result).toEqual(mockLoan);
    expect(mockFindById).toHaveBeenCalledWith('1');
    expect(mockFindById).toHaveBeenCalledTimes(1);
  });

  test('Should throw error when loan not found', async () => {
    mockFindById.mockResolvedValue(null);

    await expect(useCase.execute('1')).rejects.toThrow(LoanNotFoundError);
    expect(mockFindById).toHaveBeenCalledWith('1');
  });
});
