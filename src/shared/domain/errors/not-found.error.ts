import { DomainError } from './domain.error';

export abstract class NotFoundError extends DomainError {
  protected constructor(message: string, data?: Record<string, any>) {
    super(message, data);
  }
}
