export type Loan = {
  id: string;
  principalAmount: number;
  interestRate: number;
  termInMonths: number;
  startDate: Date;
  dueDay: number;
  remainingDebt: number;
  createdAt: Date;
};
