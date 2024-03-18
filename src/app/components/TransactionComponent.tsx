import React from "react";

interface Transaction {
  idempotencyId: string;
  amount: number | string;
  price: number | string;
  type: string;
}

interface TransactionComponentProps {
  transaction: Transaction;
}

const TransactionComponent: React.FC<TransactionComponentProps> = ({
  transaction,
}) => {
  if (!transaction) {
    return <div className="text-red-500">Error: Transaction not provided.</div>;
  }

  const { idempotencyId, amount, price, type } = transaction;

  const formatValue = (value: number | string) => {
    const num = parseFloat(value as string);
    return !isNaN(num) ? num.toFixed(2) : "";
  };

  const formattedAmount = formatValue(amount);
  const formattedPrice = formatValue(price);
  const typeColor = type === "debit" ? "text-red-500" : "text-green-500";

  return (
    <div className="p-4 border border-gray-200 shadow rounded-md overflow-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td
              className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${typeColor}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {idempotencyId}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${formattedAmount}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${formattedPrice}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TransactionComponent;
