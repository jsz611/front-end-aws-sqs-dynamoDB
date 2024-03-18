"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { fetchTransactions } from "../utils/api/fetchTransactions";

const TransactionComponent = dynamic(
  () => import("../app/components/TransactionComponent"),
  { loading: () => <p>Carregando...</p>, ssr: false }
);

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await fetchTransactions();
        if (response.success && Array.isArray(response.data)) {
          setTransactions(response.data);
        } else {
          console.error("Error fetching transactions:", response);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    getTransactions();
  }, []);

  const containerStyle =
    "flex justify-center items-center h-screen bg-gray-900 p-4";

  const gridStyle =
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";

  return (
    <div className={containerStyle}>
      <div className={gridStyle}>
        {Array.isArray(transactions) &&
          transactions.map((transaction, index) => (
            <div key={index} className="flex justify-center">
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                <TransactionComponent transaction={transaction} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TransactionsPage;
