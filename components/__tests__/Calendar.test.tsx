import { render, screen, fireEvent } from "@testing-library/react";
import { Calendar } from "@/components/ui/calendar";
import React from "react";

interface MockDayPickerProps {
    onSelect?: (date: Date) => void;
    classNames?: { day?: string };
}

jest.mock("react-day-picker", () => ({
    DayPicker: ({ onSelect, classNames }: MockDayPickerProps) => (
        <div>
            {/* Simulasi bulan/tahun */}
            <div>
                <span>June 2025</span>
                <span>2025</span>
            </div>
            {/* Tombol prev/next month */}
            <button aria-label="Previous month">Prev</button>
            <button aria-label="Next month">Next</button>

            {/* Hari-hari */}
            <button
                className={classNames?.day ?? ""}
                onClick={() => onSelect && onSelect(new Date("2025-06-15"))}
            >
                15
            </button>
            <button
                className={classNames?.day ?? ""}
                onClick={() => onSelect && onSelect(new Date("2025-06-16"))}
            >
                16
            </button>
        </div>
    ),
}));

describe("Calendar (with react-day-picker mocked)", () => {
    it("renders current month/year and can navigate to next/prev month (mocked)", () => {
        render(<Calendar />);
        // Cek ada label bulan & tahun
        expect(screen.getByText(/june 2025/i)).toBeInTheDocument();
        expect(screen.getByText("2025")).toBeInTheDocument();

        // Klik next/prev month (hanya test tombol ada & bisa di-click, tidak perlu ada efek)
        const nextBtn = screen.getByRole("button", { name: /next/i });
        fireEvent.click(nextBtn);

        const prevBtn = screen.getByRole("button", { name: /prev/i });
        fireEvent.click(prevBtn);
    });

    it("calls onSelect when date is clicked", () => {
        const handleSelect = jest.fn();
        render(<Calendar mode="single" onSelect={handleSelect} />);
        // Ambil tombol hari
        const dayButtons = screen.getAllByRole("button")
            .map(btn => btn as HTMLButtonElement)
            .filter(btn => !isNaN(Number(btn.textContent ?? "")));
        expect(dayButtons.length).toBeGreaterThan(0);
        fireEvent.click(dayButtons[0]);
        expect(handleSelect).toHaveBeenCalledWith(expect.any(Date));
    });

    it("applies custom classNames to day button", () => {
        render(<Calendar classNames={{ day: "custom-class-day" }} />);
        const dayBtn = screen.getAllByRole("button")
            .find(btn => btn.className.includes("custom-class-day"));
        expect(dayBtn).toBeDefined();
    });

    it("supports range selection (calls onSelect twice)", () => {
        const handleSelect = jest.fn();
        render(<Calendar mode="range" onSelect={handleSelect} />);
        const dayButtons = screen.getAllByRole("button")
            .map(btn => btn as HTMLButtonElement)
            .filter(btn => !isNaN(Number(btn.textContent ?? "")));
        expect(dayButtons.length).toBeGreaterThanOrEqual(2);
        fireEvent.click(dayButtons[0]);
        fireEvent.click(dayButtons[1]);
        expect(handleSelect).toHaveBeenCalledTimes(2);
    });
});
