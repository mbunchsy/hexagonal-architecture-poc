export abstract class DomainError extends Error {
  protected readonly data?: Record<string, any>;

  protected constructor(message: string, data?: Record<string, any>) {
    super(message);

    this.name = this.constructor.name;
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }

  getData() {
    return this.data;
  }

  toJSON() {
    return {
      code: this.name,
      message: this.message,
      data: this.data,
    };
  }
}
