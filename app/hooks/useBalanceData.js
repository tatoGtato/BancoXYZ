import { useEffect, useState } from "react";
import { getBalance, getTransactions } from "../services/apis";

//Test component for the balance screen
export const useBalanceData = () => {
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [balanceRes, transactionsRes] = await Promise.all([
          getBalance(),
          getTransactions(),
        ]);

        setBalance(balanceRes.accountBalance);
        setCurrency(balanceRes.currency);
        setTransactions(transactionsRes.transfers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return { balance, currency, transactions };
};
