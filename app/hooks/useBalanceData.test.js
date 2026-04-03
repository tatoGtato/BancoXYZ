import { renderHook, waitFor } from "@testing-library/react-native";
import * as apis from "../services/apis";
import { useBalanceData } from "./useBalanceData";

jest.mock("../services/apis");


describe("useBalanceData Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with empty state", () => {
    apis.getBalance.mockResolvedValueOnce({
      accountBalance: "0",
      currency: "USD",
    });
    apis.getTransactions.mockResolvedValueOnce({
      transfers: [],
    });

    const { result } = renderHook(() => useBalanceData());

    expect(result.current.balance).toBe("");
    expect(result.current.currency).toBe("");
    expect(result.current.transactions).toEqual([]);
  });

  it("should fetch balance and transactions on mount", async () => {
    const mockBalanceData = {
      accountBalance: "5000.50",
      currency: "USD",
    };

    const mockTransactionsData = {
      transfers: [
        {
          id: "1",
          payeer: { name: "John Doe" },
          value: 100,
          currency: "USD",
          date: "2024-01-15",
        },
      ],
    };

    apis.getBalance.mockResolvedValueOnce(mockBalanceData);
    apis.getTransactions.mockResolvedValueOnce(mockTransactionsData);

    const { result } = renderHook(() => useBalanceData());

    await waitFor(() => {
      expect(result.current.balance).toBe("5000.50");
    });

    expect(result.current.currency).toBe("USD");
    expect(result.current.transactions).toEqual(mockTransactionsData.transfers);
  });

  it("should call getBalance API", async () => {
    apis.getBalance.mockResolvedValueOnce({
      accountBalance: "1000",
      currency: "USD",
    });
    apis.getTransactions.mockResolvedValueOnce({
      transfers: [],
    });

    renderHook(() => useBalanceData());

    await waitFor(() => {
      expect(apis.getBalance).toHaveBeenCalled();
    });

    expect(apis.getBalance).toHaveBeenCalledTimes(1);
  });

  it("should call getTransactions API", async () => {
    apis.getBalance.mockResolvedValueOnce({
      accountBalance: "1000",
      currency: "USD",
    });
    apis.getTransactions.mockResolvedValueOnce({
      transfers: [],
    });

    renderHook(() => useBalanceData());

    await waitFor(() => {
      expect(apis.getTransactions).toHaveBeenCalled();
    });

    expect(apis.getTransactions).toHaveBeenCalledTimes(1);
  });

  it("should return balance, currency, and transactions", async () => {
    const mockBalanceData = {
      accountBalance: "7500.75",
      currency: "BRL",
    };

    const mockTransactionsData = {
      transfers: [
        {
          id: "1",
          payeer: { name: "Jane Smith" },
          value: 250,
          currency: "BRL",
          date: "2024-01-20",
        },
        {
          id: "2",
          payeer: { name: "Bob Johnson" },
          value: 500,
          currency: "BRL",
          date: "2024-01-25",
        },
      ],
    };

    apis.getBalance.mockResolvedValueOnce(mockBalanceData);
    apis.getTransactions.mockResolvedValueOnce(mockTransactionsData);

    const { result } = renderHook(() => useBalanceData());

    await waitFor(() => {
      expect(result.current.balance).toBe("7500.75");
    });

    expect(result.current).toEqual({
      balance: "7500.75",
      currency: "BRL",
      transactions: mockTransactionsData.transfers,
    });
  });

  it("should handle error when fetching balance fails", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    apis.getBalance.mockRejectedValueOnce(new Error("API Error"));
    apis.getTransactions.mockResolvedValueOnce({
      transfers: [],
    });

    const { result } = renderHook(() => useBalanceData());

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    expect(result.current.balance).toBe("");

    consoleErrorSpy.mockRestore();
  });

  it("should handle error when fetching transactions fails", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    apis.getBalance.mockResolvedValueOnce({
      accountBalance: "5000",
      currency: "USD",
    });
    apis.getTransactions.mockRejectedValueOnce(new Error("API Error"));

    const { result } = renderHook(() => useBalanceData());

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    expect(result.current.transactions).toEqual([]);

    consoleErrorSpy.mockRestore();
  });

  it("should handle empty transactions list", async () => {
    const mockBalanceData = {
      accountBalance: "3000",
      currency: "COP",
    };

    const mockTransactionsData = {
      transfers: [],
    };

    apis.getBalance.mockResolvedValueOnce(mockBalanceData);
    apis.getTransactions.mockResolvedValueOnce(mockTransactionsData);

    const { result } = renderHook(() => useBalanceData());

    await waitFor(() => {
      expect(result.current.balance).toBe("3000");
    });

    expect(result.current.transactions).toEqual([]);
  });

  it("should handle multiple transactions", async () => {
    const mockBalanceData = {
      accountBalance: "10000",
      currency: "USD",
    };

    const mockTransactionsData = {
      transfers: [
        {
          id: "1",
          payeer: { name: "Person 1" },
          value: 100,
          currency: "USD",
          date: "2024-01-01",
        },
        {
          id: "2",
          payeer: { name: "Person 2" },
          value: 200,
          currency: "USD",
          date: "2024-01-02",
        },
        {
          id: "3",
          payeer: { name: "Person 3" },
          value: 300,
          currency: "USD",
          date: "2024-01-03",
        },
      ],
    };

    apis.getBalance.mockResolvedValueOnce(mockBalanceData);
    apis.getTransactions.mockResolvedValueOnce(mockTransactionsData);

    const { result } = renderHook(() => useBalanceData());

    await waitFor(() => {
      expect(result.current.transactions.length).toBe(3);
    });

    expect(result.current.transactions).toEqual(mockTransactionsData.transfers);
  });

  it("should call both APIs in parallel using Promise.all", async () => {
    apis.getBalance.mockResolvedValueOnce({
      accountBalance: "5000",
      currency: "USD",
    });
    apis.getTransactions.mockResolvedValueOnce({
      transfers: [],
    });

    renderHook(() => useBalanceData());

    await waitFor(() => {
      expect(apis.getBalance).toHaveBeenCalled();
      expect(apis.getTransactions).toHaveBeenCalled();
    });
  });

  it("should not refetch data on re-render", async () => {
    apis.getBalance.mockResolvedValueOnce({
      accountBalance: "5000",
      currency: "USD",
    });
    apis.getTransactions.mockResolvedValueOnce({
      transfers: [],
    });

    const { rerender } = renderHook(() => useBalanceData());

    await waitFor(() => {
      expect(apis.getBalance).toHaveBeenCalledTimes(1);
    });

    rerender();

    expect(apis.getBalance).toHaveBeenCalledTimes(1);
    expect(apis.getTransactions).toHaveBeenCalledTimes(1);
  });
});
