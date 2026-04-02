import axios from "axios";
import { doTransaction, getBalance, getTransactions } from "./apis";

jest.mock("axios");

describe("APIs Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getBalance", () => {
    it("should fetch balance data successfully", async () => {
      const mockBalanceData = {
        accountBalance: "5000.50",
        currency: "USD",
      };

      axios.get.mockResolvedValueOnce({ data: mockBalanceData });

      const result = await getBalance();

      expect(result).toEqual(mockBalanceData);
      expect(axios.get).toHaveBeenCalledWith(
        "https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/balance"
      );
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it("should handle getBalance errors", async () => {
      const mockError = new Error("Network error");
      axios.get.mockRejectedValueOnce(mockError);

      await expect(getBalance()).rejects.toThrow("Network error");
    });

    it("should return balance with correct properties", async () => {
      const mockBalanceData = {
        accountBalance: "10000.00",
        currency: "USD",
      };

      axios.get.mockResolvedValueOnce({ data: mockBalanceData });

      const result = await getBalance();

      expect(result).toHaveProperty("accountBalance");
      expect(result).toHaveProperty("currency");
    });
  });

  describe("getTransactions", () => {
    it("should fetch transactions successfully", async () => {
      const mockTransactionsData = {
        transfers: [
          {
            id: "1",
            payeer: { name: "John Doe" },
            value: 100,
            currency: "USD",
            date: "2024-01-15",
          },
          {
            id: "2",
            payeer: { name: "Jane Smith" },
            value: 250,
            currency: "USD",
            date: "2024-01-20",
          },
        ],
      };

      axios.get.mockResolvedValueOnce({ data: mockTransactionsData });

      const result = await getTransactions();

      expect(result).toEqual(mockTransactionsData);
      expect(axios.get).toHaveBeenCalledWith(
        "https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com/default/transferList"
      );
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it("should handle getTransactions errors", async () => {
      const mockError = new Error("API error");
      axios.get.mockRejectedValueOnce(mockError);

      await expect(getTransactions()).rejects.toThrow("API error");
    });

    it("should return transfers array", async () => {
      const mockTransactionsData = {
        transfers: [
          {
            id: "1",
            payeer: { name: "Test" },
            value: 100,
            currency: "USD",
            date: "2024-01-15",
          },
        ],
      };

      axios.get.mockResolvedValueOnce({ data: mockTransactionsData });

      const result = await getTransactions();

      expect(Array.isArray(result.transfers)).toBe(true);
    });
  });

  describe("doTransaction", () => {
    it("should execute transaction successfully", async () => {
      const mockTransactionBody = {
        value: 500,
        currency: "USD",
        payeerDocument: "12345678",
        transferDate: "2024-01-25",
      };

      const mockResponse = {
        success: true,
        transactionId: "txn-123",
        message: "Transaction completed",
      };

      axios.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await doTransaction(mockTransactionBody);

      expect(result).toEqual(mockResponse);
      expect(axios.post).toHaveBeenCalledWith(
        "https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com/default/transfer",
        mockTransactionBody
      );
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    it("should handle doTransaction errors", async () => {
      const mockTransactionBody = {
        value: 500,
        currency: "USD",
        payeerDocument: "12345678",
        transferDate: "2024-01-25",
      };

      const mockError = new Error("Transaction failed");
      axios.post.mockRejectedValueOnce(mockError);

      await expect(doTransaction(mockTransactionBody)).rejects.toThrow(
        "Transaction failed"
      );
    });

    it("should pass correct parameters to post request", async () => {
      const mockTransactionBody = {
        value: 1000,
        currency: "BRL",
        payeerDocument: "98765432",
        transferDate: "2024-02-01",
      };

      const mockResponse = {
        success: true,
        transactionId: "txn-456",
      };

      axios.post.mockResolvedValueOnce({ data: mockResponse });

      await doTransaction(mockTransactionBody);

      expect(axios.post).toHaveBeenCalledWith(
        "https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com/default/transfer",
        mockTransactionBody
      );
    });

    it("should return transaction response data", async () => {
      const mockTransactionBody = {
        value: 250,
        currency: "COP",
        payeerDocument: "11111111",
        transferDate: "2024-01-30",
      };

      const mockResponse = {
        success: true,
        transactionId: "txn-789",
        timestamp: "2024-01-30T10:30:00Z",
      };

      axios.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await doTransaction(mockTransactionBody);

      expect(result).toHaveProperty("success");
      expect(result).toHaveProperty("transactionId");
    });
  });

  describe("axios mock integration", () => {
    it("should use axios correctly", () => {
      expect(axios.get).toBeDefined();
      expect(axios.post).toBeDefined();
    });

    it("should handle multiple consecutive calls", async () => {
      const mockBalance = { accountBalance: "5000", currency: "USD" };
      const mockTransactions = { transfers: [] };

      axios.get.mockResolvedValueOnce({ data: mockBalance });
      axios.get.mockResolvedValueOnce({ data: mockTransactions });

      await getBalance();
      await getTransactions();

      expect(axios.get).toHaveBeenCalledTimes(2);
    });
  });
});
