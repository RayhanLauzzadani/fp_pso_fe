import { render, screen } from "@testing-library/react";
import RootLayout from "../layout";
import "@testing-library/jest-dom";

jest.mock("@/components/NavbarLayout", () => {
    return {
        __esModule: true,
        default: ({ children }: { children: React.ReactNode }) => (
            <div data-testid="mock-navbar-layout">{children}</div>
        ),
    };
});

jest.mock("next/font/google", () => ({
    Geist: jest.fn(() => ({ className: "geist-sans", variable: "--font-geist-sans" })),
    Geist_Mono: jest.fn(() => ({ className: "geist-mono", variable: "--font-geist-mono" })),
}));

describe("RootLayout", () => {
    it("renders children in NavbarLayout", () => {
        render(
            <RootLayout>
                <div data-testid="child">Child Content</div>
            </RootLayout>
        );

        // Test hanya children & NavbarLayout muncul
        expect(screen.getByTestId("mock-navbar-layout")).toBeInTheDocument();
        expect(screen.getByTestId("child")).toBeInTheDocument();
    });
});