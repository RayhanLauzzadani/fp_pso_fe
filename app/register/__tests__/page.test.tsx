import { render, screen } from "@testing-library/react";
import RegisterPage from "../page";
import "@testing-library/jest-dom";

jest.mock("@/components/RegisterForm", () => {
  function MockRegisterForm() {
    return <div data-testid="mock-register-form">Mock RegisterForm</div>;
  }
  return MockRegisterForm;
});

describe("Register page", () => {
  it("renders RegisterForm component", () => {
    render(<RegisterPage />);
    expect(screen.getByTestId("mock-register-form")).toBeInTheDocument();
  });
});