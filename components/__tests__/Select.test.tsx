import { render, screen } from "@testing-library/react";
import React from "react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

describe("Select", () => {
    it("renders Select component", () => {
        render(
            <Select>
                <SelectTrigger data-testid="trigger">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                </SelectContent>
            </Select>
        );
        expect(screen.getByTestId("trigger")).toBeInTheDocument();
    });
});
