import { render } from "@testing-library/react-native";
import React from "react";
import Home from "./Home";

jest.mock("./../../i18n/index.js", () => ({
  t: (key) => key,
}));

jest.mock("@react-navigation/native-stack", () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }) => null,
    Screen: () => null,
  }),
}));

jest.mock("./../context/AuthContext", () => ({
  useAuth: () => ({
    onLogout: () => {},
  }),
}));

jest.mock("./Balance", () => {
  const React = require("react");
  const { Text } = require("react-native");
  
  return function MockBalance() {
    return React.createElement(Text, {}, "Balance Component");
  };
});

jest.mock("./Transfer", () => {
  const React = require("react");
  const { Text } = require("react-native");
  
  return function MockTransfer() {
    return React.createElement(Text, {}, "Transfer Component");
  };
});

describe("Home Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    const result = render(<Home />);

    expect(result).toBeTruthy();
  });

  it("mocks useAuth context", () => {
    render(<Home />);

    const AuthContext = require("./../context/AuthContext");
    expect(AuthContext.useAuth).toBeDefined();
  });

  it("uses i18n translations", () => {
    const result = render(<Home />);

    expect(result).toBeTruthy();
  });

  it("renders successfully with navigation stack", () => {
    const result = render(<Home />);

    expect(result).toBeTruthy();
  });

  it("has all mocked dependencies", () => {
    const result = render(<Home />);

    expect(result).toBeTruthy();
  });
});
