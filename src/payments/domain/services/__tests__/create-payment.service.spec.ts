import { CreatePaymentInput, CreatePaymentWithStatusInput } from '../../inputs';
import { PaymentsRepository } from '../../repositories/payments.repository';
import { CreatePaymentService } from '../create-payment.service';

const mockCreate = jest.fn();
const mockRepository: jest.Mocked<PaymentsRepository> = {
  create: mockCreate,
  findAll: jest.fn(),
};

const mockPaymentInput: CreatePaymentInput = {
  loanId: '1',
  amount: 100,
};

const mockPaymentWithStatus: CreatePaymentWithStatusInput = {
  ...mockPaymentInput,
  status: 'PENDING',
};

describe('CreatePaymentService', () => {
  let service: CreatePaymentService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new CreatePaymentService(mockRepository);
  });

  test('Should create a payment with status PENDING', async () => {
    mockCreate.mockResolvedValue({ id: '1', ...mockPaymentWithStatus });

    const result = await service.execute(mockPaymentInput);

    expect(result).toEqual(expect.objectContaining(mockPaymentWithStatus));
    expect(mockCreate).toHaveBeenCalledWith(mockPaymentWithStatus);
    expect(mockCreate).toHaveBeenCalledTimes(1);
  });
});
