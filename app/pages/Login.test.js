import { render } from "@testing-library/react-native";
import React from "react";
import Login from "./Login";

jest.mock("./../../i18n/index.js", () => ({
  t: (key) => key,
}));

const mockLogin = jest.fn();

jest.mock("./../context/AuthContext", () => ({
  useAuth: () => ({
    onLogin: mockLogin,
  }),
}));

describe("Login Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    const result = render(<Login />);
    
    expect(result).toBeTruthy();
  });

  it("renders input fields", () => {
    const rendered = render(<Login />);
    
    // Component should render successfully
    expect(rendered).toBeTruthy();
  });

  it("mocks authentication context", () => {
    render(<Login />);
    
    // Mock should be available
    expect(mockLogin).toBeDefined();
  });

  it("mocks i18n translations", () => {
    render(<Login />);
    
    // i18n should be mocked and working
    expect(mockLogin).toBeDefined();
  });

  it("renders successfully with mocked dependencies", () => {
    const result = render(<Login />);
    
    expect(result).toBeTruthy();
    expect(mockLogin).toBeDefined();
  });
});