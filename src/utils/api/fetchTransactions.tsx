import axios from '../../services/axios'; 

export const fetchTransactions = async () => {
  try {
    const response = await axios.get('/transactions');
    return response.data; // Assumindo que o endpoint retorna um array de transações
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return []; // Retorna um array vazio em caso de erro
  }
};
