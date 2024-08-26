import React from "react";
import { render, screen } from "@testing-library/react";
import LoginPage from "../pages/LoginPage";
import LoginForm from "../components/LoginForm";
import { AuthContext } from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";

const mockAuthContextValue = {
  user: null,
};

jest.mock("../context/AuthContext");
describe("LoginPage", () => {
  test("renders LoginForm component", () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
  });
});
