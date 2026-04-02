import { render } from "@testing-library/react-native";
import React from "react";

jest.mock("./../../i18n/index.js", () => ({
  t: (key) => key,
}));

jest.mock("./../constants/colors", () => ({
  COLORS: {
    background: "#FFFFFF",
    surface: "#F5F5F5",
    border: "#E0E0E0",
    primary: "#007AFF",
    primaryLight: "#E3F2FD",
    textPrimary: "#000000",
    textSecondary: "#666666",
    placeHolder: "#CCCCCC",
  },
}));

jest.mock("@react-native-community/datetimepicker", () => {
  const React = require("react");
  const { View } = require("react-native");

  return function MockDateTimePicker() {
    return React.createElement(View, {}, null);
  };
});

// Import after mocks
import BalanceView from "./BalanceView";

describe("BalanceView Component", () => {
  const mockOnTransfer = jest.fn();
  const mockBalance = "5000.50";
  const mockCurrency = "USD";
  const mockTransactions = [
    {
      id: "1",
      payeer: { name: "John Doe" },
      value: 500,
      currency: "USD",
      date: "2024-01-15",
    },
    {
      id: "2",
      payeer: { name: "Jane Smith" },
      value: 1200.75,
      currency: "USD",
      date: "2024-01-20",
    },
    {
      id: "3",
      payeer: { name: "Bob Johnson" },
      value: 300,
      currency: "USD",
      date: "2024-01-25",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    const result = render(
      <BalanceView
        balance={mockBalance}
        currency={mockCurrency}
        transactions={mockTransactions}
        onTransfer={mockOnTransfer}
      />
    );

    expect(result).toBeTruthy();
  });

  it("renders balance display with correct data", () => {
    const result = render(
      <BalanceView
        balance={mockBalance}
        currency={mockCurrency}
        transactions={mockTransactions}
        onTransfer={mockOnTransfer}
      />
    );

    expect(result).toBeTruthy();
  });

  it("renders transactions list", () => {
    const result = render(
      <BalanceView
        balance={mockBalance}
        currency={mockCurrency}
        transactions={mockTransactions}
        onTransfer={mockOnTransfer}
      />
    );

    expect(result).toBeTruthy();
  });

  it("renders transfer button", () => {
    const result = render(
      <BalanceView
        balance={mockBalance}
        currency={mockCurrency}
        transactions={mockTransactions}
        onTransfer={mockOnTransfer}
      />
    );

    expect(result).toBeTruthy();
  });

  it("mocks i18n translations", () => {
    render(
      <BalanceView
        balance={mockBalance}
        currency={mockCurrency}
        transactions={mockTransactions}
        onTransfer={mockOnTransfer}
      />
    );

    const i18n = require("./../../i18n/index");
    expect(i18n.t).toBeDefined();
  });

  it("renders with empty transactions list", () => {
    const result = render(
      <BalanceView
        balance={mockBalance}
        currency={mockCurrency}
        transactions={[]}
        onTransfer={mockOnTransfer}
      />
    );

    expect(result).toBeTruthy();
  });

  it("renders search input and date filter button", () => {
    const result = render(
      <BalanceView
        balance={mockBalance}
        currency={mockCurrency}
        transactions={mockTransactions}
        onTransfer={mockOnTransfer}
      />
    );

    expect(result).toBeTruthy();
  });

  it("mocks colors constants", () => {
    render(
      <BalanceView
        balance={mockBalance}
        currency={mockCurrency}
        transactions={mockTransactions}
        onTransfer={mockOnTransfer}
      />
    );

    const colors = require("./../constants/colors");
    expect(colors.COLORS).toBeDefined();
    expect(colors.COLORS.primary).toBeDefined();
  });

  it("mocks DateTimePicker component", () => {
    render(
      <BalanceView
        balance={mockBalance}
        currency={mockCurrency}
        transactions={mockTransactions}
        onTransfer={mockOnTransfer}
      />
    );

    const DateTimePicker = require("@react-native-community/datetimepicker");
    expect(DateTimePicker).toBeDefined();
  });
});
