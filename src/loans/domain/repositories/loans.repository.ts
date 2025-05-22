import { Loan } from '../models';

export interface LoansRepository {
  findById(id: string): Promise<Loan | null>;
}

export const LoansRepository = 'LoansRepository';
