import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CalculatorCard } from "@/components/CalculatorCard";
import { act } from "@testing-library/react";


// Karena ada fetch API, supaya ga error kita bisa mock global.fetch
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          rates: {
            USD: "1",
            AUD: "1.5",
            IDR: "15000",
            SGD: "1.4",
          },
        }),
    })
  ) as jest.Mock;
});

describe("CalculatorCard", () => {
  it("should render Calculator title", async () => {
    await act(async () => {
      render(<CalculatorCard />);
    });
    expect(screen.getByText(/Calculator/i)).toBeInTheDocument();
  });

  it("should have initial fromAmount of 1000", async () => {
    render(<CalculatorCard />);
    await waitFor(() => expect(screen.getByText(/Kurs realtime/i)).toBeInTheDocument());

    const fromInput = screen.getAllByPlaceholderText(/Amount/i)[0] as HTMLInputElement;
    expect(fromInput.value).toBe("1000");
  });

  it("should clear amounts when Clear button is clicked", async () => {
    render(<CalculatorCard />);
    await waitFor(() => expect(screen.getByText(/Kurs realtime/i)).toBeInTheDocument());

    const fromInput = screen.getAllByPlaceholderText(/Amount/i)[0] as HTMLInputElement;
    const toInput = screen.getAllByPlaceholderText(/Amount/i)[1] as HTMLInputElement;

    // Cek awal
    expect(fromInput.value).toBe("1000");

    // Klik Clear
    const clearButton = screen.getByRole("button", { name: /Clear/i });
    fireEvent.click(clearButton);

    // Cek input kosong
    expect(fromInput.value).toBe("");
    expect(toInput.value).toBe("");
  });

  it("should swap currencies when Swap button is clicked", async () => {
    render(<CalculatorCard />);
    await waitFor(() => expect(screen.getByText(/Kurs realtime/i)).toBeInTheDocument());

    const fromSelect = screen.getAllByRole("combobox")[0] as HTMLSelectElement;
    const toSelect = screen.getAllByRole("combobox")[1] as HTMLSelectElement;

    // Cek initial value
    expect(fromSelect.value).toBe("USD");
    expect(toSelect.value).toBe("IDR");

    // Klik Swap
    const swapButton = screen.getByRole("button", { name: /Swap currency/i });
    fireEvent.click(swapButton);

    // Cek sudah swap
    expect(fromSelect.value).toBe("IDR");
    expect(toSelect.value).toBe("USD");
  });

  it("should change fromCurrency when selecting a different option", async () => {
    render(<CalculatorCard />);
    await waitFor(() => expect(screen.getByText(/Kurs realtime/i)).toBeInTheDocument());

    const fromSelect = screen.getAllByRole("combobox")[0] as HTMLSelectElement;

    // Select SGD
    fireEvent.change(fromSelect, { target: { value: "SGD" } });

    // Expect value updated
    expect(fromSelect.value).toBe("SGD");
  });

  it("should change toCurrency when selecting a different option", async () => {
    render(<CalculatorCard />);
    await waitFor(() => expect(screen.getByText(/Kurs realtime/i)).toBeInTheDocument());

    const toSelect = screen.getAllByRole("combobox")[1] as HTMLSelectElement;

    // Select AUD
    fireEvent.change(toSelect, { target: { value: "AUD" } });

    // Expect value updated
    expect(toSelect.value).toBe("AUD");
  });
});