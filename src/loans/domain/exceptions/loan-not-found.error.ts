import { NotFoundError } from 'src/shared/domain/errors/not-found.error';

export class LoanNotFoundError extends NotFoundError {
  constructor(data: { id?: string }) {
    super('The loan was not found', data);
  }
}
