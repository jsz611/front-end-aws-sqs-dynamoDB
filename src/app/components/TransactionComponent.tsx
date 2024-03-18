// Componente TransactionComponent
import React from 'react';

interface Transaction {
  idempotencyId: string;
  amount: number;
  type: string;
}

interface TransactionComponentProps {
  transaction: Transaction;
}

const TransactionComponent: React.FC<TransactionComponentProps> = ({ transaction }) => {
  if (!transaction) {
    return <div>Error: Transaction not provided.</div>;
  }

  const { idempotencyId, amount, type } = transaction;

  if (typeof idempotencyId !== 'string' || typeof amount !== 'number' || typeof type !== 'string') {
    return <div>Error: Invalid transaction data.</div>;
  }

  const typeColor = type === 'debit' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div
      className={`
        bg-gray-800 text-white rounded-lg overflow-hidden border border-gray-700
        flex flex-col min-h-[7rem] p-4
      `}
    >
      <div className={`flex-grow ${typeColor}`}>
        <div className="font-bold text-xl capitalize">{type}</div>
        <p className="text-base mt-2">ID: {idempotencyId}</p>
        <p className="text-base">Amount: ${amount.toFixed(2)}</p>
      </div>
      <div className="mt-4">
        <span
          className={`
            inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 ${typeColor}
          `}
        >
          {type.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default TransactionComponent;
