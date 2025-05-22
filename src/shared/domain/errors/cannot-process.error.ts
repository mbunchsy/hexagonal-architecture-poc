import { DomainError } from './domain.error';

export abstract class CannotProcessError extends DomainError {
  protected constructor(message: string, data?: Record<string, any>) {
    super(message, data);
  }
}
