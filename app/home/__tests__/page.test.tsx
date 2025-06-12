import { render, screen } from "@testing-library/react";
import Home from "../page";

jest.mock("@/components/Homepage", () => {
  function MockHomepage() {
    return <div data-testid="mock-homepage">Mock Homepage</div>;
  }
  return MockHomepage;
});

describe("Home page", () => {
  it("renders Homepage component", () => {
    render(<Home />);
    expect(screen.getByTestId("mock-homepage")).toBeInTheDocument();
  });
});