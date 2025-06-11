import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BalanceCard } from "@/components/BalanceCard";
import type { User } from "firebase/auth";
import "@testing-library/jest-dom";

const fakeUser = {
  uid: "123",
  displayName: "Fake User",
  email: "fake@example.com",
} as unknown as User;

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
  onSnapshotMock.mockImplementation((ref, callback) => {
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

    await waitFor(() =>
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument()
    );

    // initial balance in USD
    expect(screen.getByText("1.000")).toBeInTheDocument();
    const dropdownBtn = screen.getByRole("button", { name: /Pilih Mata Uang/i });
    expect(dropdownBtn).toHaveTextContent("$");

    // change to IDR
    fireEvent.click(dropdownBtn);
    fireEvent.click(screen.getByText("Rp"));

    await waitFor(() => expect(dropdownBtn).toHaveTextContent("Rp"));
    expect(screen.getByText("15.000.000")).toBeInTheDocument();

    // toggle hide/show
    const toggleBtn = screen.getByRole("button", { name: /Sembunyikan Saldo/i });
    fireEvent.click(toggleBtn);
    expect(screen.getByText("*******")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Tampilkan Saldo/i })
    ).toBeInTheDocument();
  });
});