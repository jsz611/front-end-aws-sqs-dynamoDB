import axios from "../../services/axios";

export const fetchTransactions = async () => {
  try {
    const response = await axios.get("/transactions");
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};
