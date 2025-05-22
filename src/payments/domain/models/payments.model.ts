export type Payment = {
  id: string;
  loanId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
