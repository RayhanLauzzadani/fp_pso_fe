import { render, screen, act } from "@testing-library/react";
import Homepage from "@/components/Homepage";
import { onAuthStateChanged } from "firebase/auth";

// Mock next/navigation
const mockReplace = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

// Mock Firebase
jest.mock("@/lib/firebaseConfig", () => ({
  auth: {},
  db: {},
}));

jest.mock("firebase/auth", () => ({
  onAuthStateChanged: jest.fn(),
  User: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  onSnapshot: jest.fn(() => jest.fn()), // return unsubscribe fn
  doc: jest.fn(),
  getDoc: jest.fn(() => Promise.resolve({ exists: () => true })),
  setDoc: jest.fn(),
  deleteDoc: jest.fn(),
}));

// Mock child components supaya tidak error di test
jest.mock("@/components/BalanceCard", () => ({
  BalanceCard: () => <div data-testid="BalanceCard">Mock BalanceCard</div>,
}));
jest.mock("@/components/CalculatorCard", () => ({
  CalculatorCard: () => <div data-testid="CalculatorCard">Mock CalculatorCard</div>,
}));
jest.mock("@/components/AddBalanceCard", () => ({
  AddBalanceCard: () => <div data-testid="AddBalanceCard">Mock AddBalanceCard</div>,
}));
jest.mock("@/components/TransactionHistoryCard", () => ({
  TransactionHistoryCard: ({ onDelete }: { onDelete: (id: string) => void }) => (
    <div data-testid="TransactionHistoryCard">
      Mock TransactionHistoryCard
      <button onClick={() => onDelete("test-id")}>Delete TX</button>
    </div>
  ),
}));

describe("Homepage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading screen initially", () => {
    (onAuthStateChanged as jest.Mock).mockImplementationOnce((auth, callback) => {
      callback(null); // user null → loading state
      return jest.fn(); // unsubscribe
    });

    render(<Homepage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should redirect to /login if not authenticated", () => {
    (onAuthStateChanged as jest.Mock).mockImplementationOnce((auth, callback) => {
      callback(null); // no user
      return jest.fn();
    });

    render(<Homepage />);
    expect(mockReplace).toHaveBeenCalledWith("/login");
  });

  it("should render all cards if authenticated", async () => {
    const fakeUser = { uid: "123", displayName: "Test User", email: "test@example.com" };
    (onAuthStateChanged as jest.Mock).mockImplementationOnce((auth, callback) => {
      callback(fakeUser); // user exists
      return jest.fn();
    });

    await act(async () => {
      render(<Homepage />);
    });

    expect(screen.getByTestId("BalanceCard")).toBeInTheDocument();
    expect(screen.getByTestId("CalculatorCard")).toBeInTheDocument();
    expect(screen.getByTestId("AddBalanceCard")).toBeInTheDocument();
    expect(screen.getByTestId("TransactionHistoryCard")).toBeInTheDocument();
  });
});
