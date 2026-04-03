import { useState } from "react";
import { doTransaction } from "../services/apis";

//Test component for the transaction screen
export const doTransactions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const executeTransaction = async (body) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await doTransaction(body);

      setSuccess(true);
      return response;
    } catch (err) {
      console.error("Transaction error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    executeTransaction,
    loading,
    error,
    success,
  };
};
