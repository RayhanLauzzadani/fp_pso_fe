import { render, screen } from "@testing-library/react";
import Homepage from "@/components/Homepage";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

jest.mock("@/lib/firebaseConfig", () => ({
  auth: {},
  db: {},
}));

jest.mock("firebase/auth", () => ({
  onAuthStateChanged: jest.fn(() => jest.fn()), // FIX di sini
  User: jest.fn(),
}));

describe("Homepage", () => {
  it("should render loading screen initially", () => {
    render(<Homepage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
