export type CreatePaymentInput = {
  loanId: string;
  amount: number;
};

export type CreatePaymentWithStatusInput = {
  loanId: string;
  amount: number;
  status: string;
};
