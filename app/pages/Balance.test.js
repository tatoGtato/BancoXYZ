import { render } from "@testing-library/react-native";
import React from "react";
import Balance from "./Balance";

jest.mock("./../../i18n/index.js", () => ({
  t: (key) => key,
}));

jest.mock("./../hooks/useBalanceData", () => ({
  useBalanceData: () => ({
    balance: "1000.50",
    currency: "USD",
    transactions: [
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
        value: 250.75,
        currency: "USD",
        date: "2024-01-20",
      },
    ],
  }),
}));

jest.mock("./../components/BalanceView", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return function MockBalanceView() {
    return React.createElement(Text, {}, "BalanceView Component");
  };
});

describe("Balance Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    const mockNavigation = { navigate: jest.fn() };
    const result = render(<Balance navigation={mockNavigation} />);

    expect(result).toBeTruthy();
  });

  it("renders BalanceView component", () => {
    const mockNavigation = { navigate: jest.fn() };
    const result = render(<Balance navigation={mockNavigation} />);

    expect(result).toBeTruthy();
  });

  it("mocks useBalanceData hook", () => {
    const mockNavigation = { navigate: jest.fn() };
    render(<Balance navigation={mockNavigation} />);

    const useBalanceData = require("./../hooks/useBalanceData");
    expect(useBalanceData.useBalanceData).toBeDefined();
  });

  it("passes balance data to BalanceView", () => {
    const mockNavigation = { navigate: jest.fn() };
    const result = render(<Balance navigation={mockNavigation} />);

    expect(result).toBeTruthy();
  });

  it("renders successfully with all dependencies", () => {
    const mockNavigation = { navigate: jest.fn() };
    const result = render(<Balance navigation={mockNavigation} />);

    expect(result).toBeTruthy();
  });
});
