import { render, screen } from "@testing-library/react";
import NavbarLayout from "../NavbarLayout";
import "@testing-library/jest-dom";

// Mock fetch → fix Firebase error
global.fetch = require("jest-fetch-mock");

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/home"), // Simulate route where Navbar shows
}));

// Mock Navbar → karena kita cuma mau test Layout nya
jest.mock("../Navbar", () => () => <div data-testid="mock-navbar">Mock Navbar</div>);

describe("NavbarLayout", () => {
  it("renders Navbar and children when not on login/register/landing", () => {
    render(
      <NavbarLayout>
        <div data-testid="child-content">Child Content</div>
      </NavbarLayout>
    );

    // Cek Navbar tampil
    expect(screen.getByTestId("mock-navbar")).toBeInTheDocument();

    // Cek child content tampil
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });
});
