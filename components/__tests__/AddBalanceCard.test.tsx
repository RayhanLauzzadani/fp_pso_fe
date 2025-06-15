import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddBalanceCard } from "../AddBalanceCard";
import type { User } from "firebase/auth";
import React from "react";

// Util untuk flatten opsi select (abaikan <img> dsb)
type SelectItemProps = { value: string; children: React.ReactNode };
type SelectItemOption = React.ReactElement<SelectItemProps>;

function flattenOptions(children: React.ReactNode): SelectItemOption[] {
    const items: SelectItemOption[] = [];
    React.Children.forEach(children, (child) => {
        if (!child) return;
        if (Array.isArray(child)) {
            items.push(...flattenOptions(child));
        } else if (React.isValidElement(child) && child.type === React.Fragment) {
            const fragment = child as React.ReactElement<{ children: React.ReactNode }>;
            items.push(...flattenOptions(fragment.props.children));
        } else if (React.isValidElement(child)) {
            if (typeof child.type === "function" && child.type.name === "SelectContent") {
                const selectContent = child as React.ReactElement<{ children: React.ReactNode }>;
                items.push(...flattenOptions(selectContent.props.children));
            } else {
                const elem = child as React.ReactElement<SelectItemProps>;
                if (elem.props && typeof elem.props.value === "string") {
                    items.push(elem);
                }
            }
        }
    });
    return items;
}

// MOCK Select UI (dengan role combobox!)
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
    }) => {
        const options = flattenOptions(children);
        return (
            <select
                role="combobox"
                data-testid={dataTestId}
                value={value}
                onChange={e => onValueChange(e.target.value)}
            >
                {options.map(child => {
                    let label = "";
                    if (Array.isArray(child.props.children)) {
                        // Gabung string, skip selain string (ex: <img>)
                        label = child.props.children.filter(ch => typeof ch === "string").join(" ").trim();
                    } else if (typeof child.props.children === "string") {
                        label = child.props.children;
                    }
                    return (
                        <option key={child.props.value} value={child.props.value}>
                            {label}
                        </option>
                    );
                })}
            </select>
        );
    },
    SelectTrigger: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    SelectContent: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    SelectItem: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    SelectValue: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("@/components/ui/popover", () => ({
    Popover: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    PopoverTrigger: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    PopoverContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// --- FIREBASE MOCK ---
jest.mock("@/lib/firebaseConfig", () => ({
    db: {},
}));

// --- Mock Calendar: input[type=date] ---
jest.mock("@/components/ui/calendar", () => ({
    Calendar: ({
        selected,
        onSelect,
    }: { selected?: Date; onSelect: (d?: Date) => void }) => {
        const [value, setValue] = React.useState(
            selected ? selected.toISOString().slice(0, 10) : ""
        );
        React.useEffect(() => {
            setValue(selected ? selected.toISOString().slice(0, 10) : "");
        }, [selected]);
        return (
            <input
                data-testid="calendar-input"
                type="date"
                value={value}
                onChange={e => {
                    setValue(e.target.value);
                    if (e.target.value) onSelect(new Date(e.target.value));
                    else onSelect(undefined);
                }}
            />
        );
    }
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
    mockSetDoc.mockResolvedValue(undefined);
    mockAddDoc.mockResolvedValue(undefined);
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
    const amountInput = screen.getByPlaceholderText(/Amount/i) as HTMLInputElement;
    expect(amountInput.value).toBe("");
});

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

it("memproses input lengkap dan memanggil callback sesuai", async () => {
    const fakeUser = { uid: "user123" } as unknown as User;
    mockGetDoc.mockResolvedValue({ exists: () => true, data: () => ({ balance: 0 }) });
    const onTransaction = jest.fn();

    render(<AddBalanceCard user={fakeUser} onTransaction={onTransaction} />);
    const user = userEvent.setup();

    // --- Input amount & desc
    await user.type(screen.getByPlaceholderText(/Amount/i), "200");
    await user.type(screen.getByPlaceholderText(/Write here/i), "Beli buku");

    // --- Pilih currency USD
    const currencySelect = screen.getByTestId("currency-select");
    if (!(currencySelect instanceof HTMLSelectElement)) {
        throw new Error("Not a select element");
    }
    expect(currencySelect.value).toBe("USD");
    await user.selectOptions(currencySelect, "USD");
    expect(currencySelect.value).toBe("USD");

    // --- Pilih type expense
    const allComboboxes = screen.getAllByRole("combobox");
    const typeSelect = allComboboxes[1] as HTMLSelectElement;
    await user.selectOptions(typeSelect, "expense");
    expect(typeSelect.value).toBe("expense");

    // --- Set tanggal (PAKAI fireEvent.change!)
    const dateInput = await screen.findByTestId("calendar-input") as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: "2025-06-15" } });
    expect(dateInput.value).toBe("2025-06-15");

    // --- Submit
    await user.click(screen.getByRole("button", { name: /Save/i }));

    // --- Pastikan callback dipanggil
    await waitFor(() => expect(onTransaction).toHaveBeenCalled());
    const tx = onTransaction.mock.calls[0][0];
    expect(tx).toMatchObject({
        desc: "Beli buku",
        amount: 200,
        type: "expense",
        currency: "USD"
    });
});

it("should call onTransaction when submit minimal form", async () => {
    const fakeUser = { uid: "user123" } as unknown as User;
    mockGetDoc.mockResolvedValue({ exists: () => true, data: () => ({ balance: 0 }) });
    const onTransaction = jest.fn();

    render(<AddBalanceCard user={fakeUser} onTransaction={onTransaction} />);
    const user = userEvent.setup();

    // WAJIB isi Amount, karena required
    await user.type(screen.getByPlaceholderText(/Amount/i), "1");
    // Boleh lewati field lain, karena Type/currency default

    await user.click(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => expect(onTransaction).toHaveBeenCalled());
});

