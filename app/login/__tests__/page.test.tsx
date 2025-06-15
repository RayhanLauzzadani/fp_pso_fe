import { render, screen } from "@testing-library/react";
import LoginPage from "../page";

jest.mock("@/components/LoginForm", () => {
  return function MockLoginForm() {
    return <div data-testid="mock-login-form">Mock LoginForm</div>;
  };
});

describe("Login page", () => {
  it("renders LoginForm component", () => {
    render(<LoginPage />);
    expect(screen.getByTestId("mock-login-form")).toBeInTheDocument();
  });
});