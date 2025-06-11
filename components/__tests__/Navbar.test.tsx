import { render, screen } from "@testing-library/react";
import Navbar from "../Navbar";
import "@testing-library/jest-dom";

// Mocks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock("@/lib/firebaseConfig", () => ({
  auth: {},
}));

jest.mock("firebase/auth", () => ({
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback(null); // Simulasi user logout
    return () => {}; // Return unsubscribe function
  }),
  signOut: jest.fn(),
}));

describe("Navbar", () => {
  it("renders Navbar with DooIT logo and menu links", () => {
    render(<Navbar />);

    // Cek logo teks DooIT
    expect(screen.getByText(/DooIT/i)).toBeInTheDocument();

    // Cek link About & Instruction
    expect(screen.getByRole("link", { name: /About/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Instruction/i })).toBeInTheDocument();
  });
});
