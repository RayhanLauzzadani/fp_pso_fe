import { render, screen } from "@testing-library/react";
import { TransactionHistoryCard } from "@/components/TransactionHistoryCard";

describe("TransactionHistoryCard", () => {
  it("should display 'No transaction yet.' when history is empty", () => {
    render(<TransactionHistoryCard history={[]} />);
    expect(screen.getByText("No transaction yet.")).toBeInTheDocument();
  });

  it("should render a list of transactions", () => {
  const history = [
    {
      id: "1",
      type: "income",
      amount: 100000,
      currency: "IDR",
      countryFlag: "/flags/id.png",
      desc: "Salary",
      date: "2025-06-01",
    },
    {
      id: "2",
      type: "expense",
      amount: 50000,
      currency: "IDR",
      countryFlag: "/flags/id.png",
      desc: "Groceries",
      date: "2025-06-02",
    },
  ];

  render(<TransactionHistoryCard history={history} />);

  // Pakai function matcher supaya fleksibel
  expect(
    screen.getByText((content) => content.includes("+100.000 IDR"))
  ).toBeInTheDocument();

  expect(screen.getByText("Salary")).toBeInTheDocument();

  expect(
    screen.getByText((content) => content.includes("-50.000 IDR"))
  ).toBeInTheDocument();

  expect(screen.getByText("Groceries")).toBeInTheDocument();
});
});