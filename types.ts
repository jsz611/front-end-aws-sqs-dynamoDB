interface Transaction {
  idempotencyId: string;
  amount: number;
  type: string;
}

interface TransactionComponentProps {
  transaction: Transaction;
}
