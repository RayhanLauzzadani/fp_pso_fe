import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BalanceCard } from "../BalanceCard";
import type { User } from "firebase/auth";

// Mock komponen-komponen UI eksternal jika perlu (optional, biasanya tidak perlu kalau pakai UI sendri)

// Mock Firestore onSnapshot
jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  onSnapshot: jest.fn((ref, callback) => {
    // Panggil callback dengan user balance 1000
    setTimeout(() => callback({ exists: () => true, data: () => ({ balance: 1000 }) }), 0);
    return jest.fn(); // unsubscribe
  }),
}));

// Mock FirebaseConfig db
jest.mock("@/lib/firebaseConfig", () => ({
  db: {},
}));

// Mock fetch untuk rates
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          rates: {
            USD: "1",
            IDR: "15000",
            SGD: "1.5",
            AUD: "2",
          },
        }),
    })
  ) as jest.Mock;
});

afterAll(() => {
  // Restore fetch setelah semua test
  (global.fetch as jest.Mock).mockRestore?.();
});

// Mock user
const fakeUser = {
  uid: "test-uid",
  displayName: "Fake User",
  email: "fakeuser@email.com",
} as User;

describe("BalanceCard", () => {
  it("shows loading screen if loading", async () => {
    // Test loading state
    render(<BalanceCard user={fakeUser} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    // Tunggu balance muncul
    await screen.findByText(/Total Balance/i);
  });

  it("shows balance, allows currency change and toggle visibility", async () => {
    render(<BalanceCard user={fakeUser} />);
    // Tunggu Total Balance (setelah loading selesai)
    await screen.findByText(/Total Balance/i);

    // Pastikan balance awal USD
    expect(screen.getByText("$")).toBeInTheDocument();
    expect(screen.getByTitle("1.000")).toBeInTheDocument(); // 1000 USD

    // Klik tombol mata uang (dropdown)
    const dropdownBtn = screen.getByLabelText("Pilih Mata Uang");
    fireEvent.click(dropdownBtn);

    // Tunggu Rp muncul (karena menu radio item baru muncul saat dropdown open)
    const idrOption = await screen.findByText("Rp");
    fireEvent.click(idrOption);

    // Sekarang harus menampilkan mata uang Rp
    await waitFor(() => expect(dropdownBtn).toHaveTextContent("Rp"));
    // Balance seharusnya sudah dalam bentuk IDR (1000 x 15000 = 15.000.000)
    expect(screen.getByText("15.000.000")).toBeInTheDocument();

    // Klik tombol sembunyikan saldo (icon mata)
    const eyeBtn = screen.getByTitle("Sembunyikan Saldo");
    fireEvent.click(eyeBtn);

    // Sekarang balance disembunyikan
    expect(screen.getByText("*******")).toBeInTheDocument();

    // Klik lagi untuk tampilkan saldo
    const showBtn = screen.getByTitle("Tampilkan Saldo");
    fireEvent.click(showBtn);

    // Saldo muncul lagi
    expect(screen.getByText("15.000.000")).toBeInTheDocument();
  });
});
