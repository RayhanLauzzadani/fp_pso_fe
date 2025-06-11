import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddBalanceCard } from "../AddBalanceCard";
import type { User } from "firebase/auth";

jest.mock("@/lib/firebaseConfig", () => ({
  db: {},
}));

const mockDoc = jest.fn();
const mockGetDoc = jest.fn();
const mockSetDoc = jest.fn();
const mockCollection = jest.fn();
const mockAddDoc = jest.fn();

jest.mock("firebase/firestore", () => ({
  doc: (...args: unknown[]) => mockDoc(...args),
  getDoc: (...args: unknown[]) => mockGetDoc(...args),
  setDoc: (...args: unknown[]) => mockSetDoc(...args),
  collection: (...args: unknown[]) => mockCollection(...args),
  addDoc: (...args: unknown[]) => mockAddDoc(...args),
}));

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          rates: {
            USD: "1",
            IDR: "15000",
          },
        }),
    })
  ) as jest.Mock;
});

beforeEach(() => {
  jest.clearAllMocks();
});

it("submits data and calls firebase functions", async () => {
  const fakeUser = { uid: "abc" } as unknown as User;
  mockGetDoc.mockResolvedValue({ exists: () => true, data: () => ({ balance: 0 }) });

  const onTransaction = jest.fn();

  render(<AddBalanceCard user={fakeUser} onTransaction={onTransaction} />);

  const user = userEvent.setup();
  await user.type(screen.getByPlaceholderText(/Amount/i), "100");
  await user.type(screen.getByPlaceholderText(/Write here/i), "Test");
  await user.click(screen.getByRole("button", { name: /Save/i }));

  await waitFor(() => {
    expect(mockSetDoc).toHaveBeenCalled();
    expect(mockAddDoc).toHaveBeenCalled();
    expect(onTransaction).toHaveBeenCalled();
  });
});

it("alerts when no user", async () => {
  window.alert = jest.fn();

  render(<AddBalanceCard user={null} />);

  const user = userEvent.setup();
  await user.type(screen.getByPlaceholderText(/Amount/i), "50");
  await user.click(screen.getByRole("button", { name: /Save/i }));

  expect(window.alert).toHaveBeenCalledWith("User not found!");
  expect(mockSetDoc).not.toHaveBeenCalled();
  expect(mockAddDoc).not.toHaveBeenCalled();
});