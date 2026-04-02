import { act, renderHook } from "@testing-library/react-native";
import * as apis from "../services/apis";
import { doTransactions } from "./doTransactions";

jest.mock("../services/apis");

describe("doTransactions Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with correct default state", () => {
    apis.doTransaction.mockResolvedValueOnce({});

    const { result } = renderHook(() => doTransactions());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.success).toBe(false);
  });

  it("should return executeTransaction function", () => {
    apis.doTransaction.mockResolvedValueOnce({});

    const { result } = renderHook(() => doTransactions());

    expect(typeof result.current.executeTransaction).toBe("function");
  });

  it("should call doTransaction API with correct parameters", async () => {
    const mockTransactionBody = {
      value: 750,
      currency: "BRL",
      payeerDocument: "55555555",
      transferDate: "2024-02-10",
    };

    apis.doTransaction.mockResolvedValueOnce({ success: true });

    const { result } = renderHook(() => doTransactions());

    await act(async () => {
      await result.current.executeTransaction(mockTransactionBody);
    });

    expect(apis.doTransaction).toHaveBeenCalledWith(mockTransactionBody);
    expect(apis.doTransaction).toHaveBeenCalledTimes(1);
  });

  it("should set loading to false after transaction completes", async () => {
    const mockTransactionBody = {
      value: 100,
      currency: "USD",
      payeerDocument: "11111111",
      transferDate: "2024-01-01",
    };

    apis.doTransaction.mockResolvedValueOnce({ success: true });

    const { result } = renderHook(() => doTransactions());

    await act(async () => {
      await result.current.executeTransaction(mockTransactionBody);
    });

    expect(result.current.loading).toBe(false);
  });

  it("should handle transaction success and return response", async () => {
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

    apis.doTransaction.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => doTransactions());

    let transactionResult;

    await act(async () => {
      transactionResult = await result.current.executeTransaction(
        mockTransactionBody
      );
    });

    expect(transactionResult.success).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should handle transaction error and set error state", async () => {
    const mockTransactionBody = {
      value: 500,
      currency: "USD",
      payeerDocument: "12345678",
      transferDate: "2024-01-25",
    };

    const mockError = new Error("Transaction failed");
    apis.doTransaction.mockRejectedValueOnce(mockError);

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const { result } = renderHook(() => doTransactions());

    await act(async () => {
      await result.current.executeTransaction(mockTransactionBody);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeDefined();
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it("should reset error state on successful transaction after failure", async () => {
    const mockTransactionBody = {
      value: 250,
      currency: "COP",
      payeerDocument: "11111111",
      transferDate: "2024-01-30",
    };

    const mockError = new Error("Previous error");

    apis.doTransaction.mockRejectedValueOnce(mockError);

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const { result } = renderHook(() => doTransactions());

    // First transaction fails
    await act(async () => {
      await result.current.executeTransaction(mockTransactionBody);
    });

    expect(result.current.error).toBeDefined();

    // Second transaction succeeds
    apis.doTransaction.mockResolvedValueOnce({ success: true });

    await act(async () => {
      await result.current.executeTransaction(mockTransactionBody);
    });

    expect(apis.doTransaction).toHaveBeenCalledTimes(2);
    expect(result.current.loading).toBe(false);

    consoleErrorSpy.mockRestore();
  });

  it("should set loading to false even on error", async () => {
    const mockTransactionBody = {
      value: 300,
      currency: "BRL",
      payeerDocument: "33333333",
      transferDate: "2024-02-05",
    };

    apis.doTransaction.mockRejectedValueOnce(new Error("API Error"));

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const { result } = renderHook(() => doTransactions());

    await act(async () => {
      await result.current.executeTransaction(mockTransactionBody);
    });

    expect(result.current.loading).toBe(false);

    consoleErrorSpy.mockRestore();
  });

  it("should handle multiple consecutive transactions", async () => {
    const mockTransactionBody1 = {
      value: 100,
      currency: "USD",
      payeerDocument: "11111111",
      transferDate: "2024-01-01",
    };

    const mockTransactionBody2 = {
      value: 200,
      currency: "BRL",
      payeerDocument: "22222222",
      transferDate: "2024-01-02",
    };

    apis.doTransaction.mockResolvedValueOnce({ success: true });
    apis.doTransaction.mockResolvedValueOnce({ success: true });

    const { result } = renderHook(() => doTransactions());

    await act(async () => {
      await result.current.executeTransaction(mockTransactionBody1);
    });

    expect(result.current.loading).toBe(false);

    await act(async () => {
      await result.current.executeTransaction(mockTransactionBody2);
    });

    expect(result.current.loading).toBe(false);
    expect(apis.doTransaction).toHaveBeenCalledTimes(2);
  });

  it("should return transaction response data", async () => {
    const mockTransactionBody = {
      value: 500,
      currency: "USD",
      payeerDocument: "12345678",
      transferDate: "2024-01-25",
    };

    const mockResponse = {
      success: true,
      transactionId: "txn-456",
      timestamp: "2024-01-25T10:30:00Z",
      amount: 500,
    };

    apis.doTransaction.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => doTransactions());

    let response;

    await act(async () => {
      response = await result.current.executeTransaction(mockTransactionBody);
    });

    expect(response).toBeTruthy();
    expect(response.success).toBe(true);
  });

  it("should reset success state on new transaction", async () => {
    const mockTransactionBody = {
      value: 100,
      currency: "USD",
      payeerDocument: "99999999",
      transferDate: "2024-02-01",
    };

    apis.doTransaction.mockResolvedValueOnce({ success: true });

    const { result } = renderHook(() => doTransactions());

    let firstResponse;
    await act(async () => {
      firstResponse = await result.current.executeTransaction(mockTransactionBody);
    });

    expect(firstResponse).toBeDefined();

    apis.doTransaction.mockRejectedValueOnce(new Error("Failed"));

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await act(async () => {
      await result.current.executeTransaction(mockTransactionBody);
    });

    expect(result.current.error).toBeDefined();

    consoleErrorSpy.mockRestore();
  });
});
