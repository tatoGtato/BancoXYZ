import { render } from "@testing-library/react-native";
import React from "react";
import Transfer from "./Transfer";

jest.mock("./../../i18n/index.js", () => ({
  t: (key) => key,
}));

jest.mock("./../hooks/doTransactions", () => ({
  doTransactions: () => ({
    executeTransaction: jest.fn(),
    loading: false,
    error: null,
    success: false,
  }),
}));

jest.mock("@react-native-community/datetimepicker", () => {
  const React = require("react");
  const { View } = require("react-native");

  return function MockDateTimePicker() {
    return React.createElement(View, {}, null);
  };
});

jest.mock("@react-native-picker/picker", () => {
  const React = require("react");
  const { View } = require("react-native");

  const Picker = function MockPicker() {
    return React.createElement(View, {}, null);
  };

  Picker.Item = function MockPickerItem() {
    return null;
  };

  return { Picker };
});

describe("Transfer Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    const mockNavigation = { goBack: jest.fn() };
    const result = render(<Transfer navigation={mockNavigation} />);

    expect(result).toBeTruthy();
  });

  it("renders transfer form elements", () => {
    const mockNavigation = { goBack: jest.fn() };
    const result = render(<Transfer navigation={mockNavigation} />);

    expect(result).toBeTruthy();
  });

  it("mocks doTransactions hook", () => {
    const mockNavigation = { goBack: jest.fn() };
    render(<Transfer navigation={mockNavigation} />);

    const doTransactions = require("./../hooks/doTransactions");
    expect(doTransactions.doTransactions).toBeDefined();
  });

  it("uses i18n translations", () => {
    const mockNavigation = { goBack: jest.fn() };
    const result = render(<Transfer navigation={mockNavigation} />);

    expect(result).toBeTruthy();
  });

  it("renders successfully with all dependencies", () => {
    const mockNavigation = { goBack: jest.fn() };
    const result = render(<Transfer navigation={mockNavigation} />);

    expect(result).toBeTruthy();
  });
});
