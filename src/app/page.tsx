// Marque o componente como um Componente de Cliente
"use client";

// Importe React explicitamente
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { fetchTransactions } from '../utils/api/fetchTransactions';

// Importe o componente TransactionComponent dinamicamente
const TransactionComponent = dynamic(
  () => import('../app/components/TransactionComponent'),
  { loading: () => <p>Carregando...</p>, ssr: false } // Renderização do lado do cliente
);

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  // Efeito para buscar transações ao montar o componente
  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await fetchTransactions();
        if (response.success && Array.isArray(response.data)) {
          setTransactions(response.data);
        } else {
          console.error('Error fetching transactions:', response);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    getTransactions();
  }, []); // Este efeito será executado apenas uma vez após a montagem do componente

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(transactions) && transactions.map((transaction, index) => (
          <div key={index} className="flex justify-center">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <TransactionComponent transaction={transaction} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsPage;
