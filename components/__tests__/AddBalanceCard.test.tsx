import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddBalanceCard } from "../AddBalanceCard";
import type { User } from "firebase/auth";
import React from "react";

// --- MOCK Select Component from shadcn/ui to Native Select for Testing! ---
jest.mock("@/components/ui/select", () => ({
    Select: ({
        value,
        onValueChange,
        children,
        "data-testid": dataTestId,
    }: {
        value: string;
        onValueChange: (val: string) => void;
        children: React.ReactNode;
        "data-testid"?: string;
    }) => (
        <select
            data-testid={dataTestId}
            value={value}
            onChange={e => onValueChange(e.target.value)}
        >
            {React.Children.map(children, (child) => {
                if (
                    React.isValidElement(child) &&
                    typeof (child as React.ReactElement<{ value: string }>).props.value === "string"
                ) {
                    return (
                        <option value={(child as React.ReactElement<{ value: string }>).props.value}>
                            {(child as React.ReactElement<{ value: string; children?: React.ReactNode }>).props.children}
                        </option>
                    );
                }
                return null;
            })}
        </select>
    ),
    SelectTrigger: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    SelectContent: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    SelectItem: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    SelectValue: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// --- FIREBASE MOCK ---
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
    window.alert = jest.fn();
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

it("converts currency and resets form after submit", async () => {
    const fakeUser = { uid: "abc" } as unknown as User;
    mockGetDoc.mockResolvedValue({ exists: () => true, data: () => ({ balance: 100 }) });

    render(<AddBalanceCard user={fakeUser} />);

    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText(/Amount/i), "15000");
    await user.type(screen.getByPlaceholderText(/Write here/i), "Test");
    await user.click(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => expect(mockSetDoc).toHaveBeenCalled());

    expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("symbols=USD,IDR")
    );
    const setDocData = (mockSetDoc.mock.calls[0] as unknown[])[1] as { balance: number };
    expect(setDocData.balance).toBeCloseTo(101);
    expect((screen.getByPlaceholderText(/Amount/i) as HTMLInputElement).value).toBe("");
});

// it("does not fetch rates when currency is USD", async () => {
//     const fakeUser = { uid: "abc" } as unknown as User;
//     mockGetDoc.mockResolvedValue({ exists: () => true, data: () => ({ balance: 10 }) });

//     render(<AddBalanceCard user={fakeUser} />);
//     const user = userEvent.setup();

//     // Cari select currency yang punya option USD
//     const currencySelect = findSelectWithOption("currency-select", "USD");
//     await user.selectOptions(currencySelect, "USD");
//     expect(currencySelect.value).toBe("USD");

//     await user.type(screen.getByPlaceholderText(/Amount/i), "5");
//     await user.click(screen.getByRole("button", { name: /Save/i }));

//     await waitFor(() => expect(mockSetDoc).toHaveBeenCalled());
//     expect(global.fetch).not.toHaveBeenCalled();
// });

// it("can change type to expense and submit", async () => {
//     const fakeUser = { uid: "abc" } as unknown as User;
//     mockGetDoc.mockResolvedValue({ exists: () => true, data: () => ({ balance: 10 }) });

//     render(<AddBalanceCard user={fakeUser} />);
//     const user = userEvent.setup();

//     // Ganti type ke expense
//     const typeSelect = findSelectWithOption("type-select", "expense");
//     await user.selectOptions(typeSelect, "expense");
//     expect(typeSelect.value).toBe("expense");

//     await user.type(screen.getByPlaceholderText(/Amount/i), "50");
//     await user.click(screen.getByRole("button", { name: /Save/i }));

//     await waitFor(() => expect(mockSetDoc).toHaveBeenCalled());
// });

it("shows error alert when submission fails", async () => {
    const fakeUser = { uid: "abc" } as unknown as User;
    mockGetDoc.mockResolvedValue({ exists: () => true, data: () => ({ balance: 0 }) });
    mockSetDoc.mockRejectedValue(new Error("firestore error"));
    window.alert = jest.fn();

    render(<AddBalanceCard user={fakeUser} />);

    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText(/Amount/i), "100");
    await user.click(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => expect(window.alert).toHaveBeenCalledWith("firestore error"));
});
