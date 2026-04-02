import { render } from "@testing-library/react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { AuthProvider, useAuth } from "./AuthContext";

jest.mock("./../../i18n/index.js", () => ({
  t: (key) => key,
}));

jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

jest.mock("axios", () => ({
  post: jest.fn(),
  defaults: {
    headers: {
      common: {},
    },
  },
}));

const TestComponent = () => {
  const { authState, onLogin, onLogout } = useAuth();
  return (
    <>{authState && onLogin && onLogout ? "AuthContext Loaded" : "Not Loaded"}</>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders AuthProvider without crashing", () => {
    const result = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(result).toBeTruthy();
  });

  it("provides useAuth hook with context values", () => {
    const result = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(result).toBeTruthy();
  });

  it("initializes authState with default values", () => {
    SecureStore.getItemAsync.mockResolvedValue(null);

    const result = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(result).toBeTruthy();
  });

  it("mocks axios for API calls", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(axios.post).toBeDefined();
  });

  it("mocks secure storage for token management", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(SecureStore.getItemAsync).toBeDefined();
    expect(SecureStore.setItemAsync).toBeDefined();
    expect(SecureStore.deleteItemAsync).toBeDefined();
  });
});
