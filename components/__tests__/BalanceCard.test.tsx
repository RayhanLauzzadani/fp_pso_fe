import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BalanceCard } from "@/components/BalanceCard";
import type { User } from "firebase/auth";
import "@testing-library/jest-dom";

// --- Fake User Mock
const fakeUser = {
  uid: "123",
  displayName: "Fake User",
  email: "fake@example.com",
} as unknown as User;

// --- Firestore & fetch Mocking
const onSnapshotMock = jest.fn();

jest.mock("@/lib/firebaseConfig", () => ({
  db: {},
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  onSnapshot: (...args: unknown[]) => onSnapshotMock(...args),
}));

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          rates: { USD: "1", IDR: "15000", SGD: "1.5", AUD: "2" },
        }),
    })
  ) as jest.Mock;
});

beforeEach(() => {
  // Setup Firestore onSnapshot behavior
  onSnapshotMock.mockImplementation((docRef, callback) => {
    callback({
      exists: () => true,
      data: () => ({ balance: 1000 }),
    });
    return jest.fn();
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("BalanceCard", () => {
  it("shows balance, allows currency change and toggle visibility", async () => {
    render(<BalanceCard user={fakeUser} />);

    // Wait for loading to disappear
    await waitFor(() =>
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument()
    );

    // initial balance in USD
    expect(screen.getByText("1.000")).toBeInTheDocument();
    const dropdownBtn = screen.getByRole("button", { name: /Pilih Mata Uang/i });
    expect(dropdownBtn).toHaveTextContent("$");

    const user = userEvent.setup();

    // --- Open dropdown and select "Rp" (IDR)
    await user.click(dropdownBtn);
    await user.click(await screen.findByText("Rp"));

    await waitFor(() => expect(dropdownBtn).toHaveTextContent("Rp"));
    expect(screen.getByText("15.000.000")).toBeInTheDocument();

    // --- Hide balance
    const toggleBtn = screen.getByRole("button", { name: /Sembunyikan Saldo/i });
    await user.click(toggleBtn);
    expect(screen.getByText("*******")).toBeInTheDocument();

    // --- Show again (the eye button changes title)
    expect(
      screen.getByRole("button", { name: /Tampilkan Saldo/i })
    ).toBeInTheDocument();
  });
});
