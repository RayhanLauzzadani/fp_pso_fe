import { render, screen } from "@testing-library/react";
import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from "@/components/ui/popover";
import React from "react";

jest.mock("@radix-ui/react-popover", () => ({
  Root: ({ children, ...rest }: React.PropsWithChildren<Record<string, unknown>>) => <div {...rest}>{children}</div>,
  Trigger: ({ children, ...rest }: React.PropsWithChildren<Record<string, unknown>>) => <button {...rest}>{children}</button>,
  Content: ({ children, className, ...rest }: React.PropsWithChildren<{ className?: string } & Record<string, unknown>>) => <div className={className} {...rest}>{children}</div>,
  Portal: ({ children }: React.PropsWithChildren<unknown>) => <>{children}</>,
  Anchor: ({ children, ...rest }: React.PropsWithChildren<Record<string, unknown>>) => <span {...rest}>{children}</span>,
}));

describe("Popover", () => {
  it("renders Popover, Trigger, Content, and Anchor", () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Isi Popover</PopoverContent>
        <PopoverAnchor>Anchor</PopoverAnchor>
      </Popover>
    );
    expect(screen.getByText("Open")).toBeInTheDocument();
    expect(screen.getByText("Isi Popover")).toBeInTheDocument();
    expect(screen.getByText("Anchor")).toBeInTheDocument();
  });

  it("passes className and props to PopoverContent", () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent className="test-class">Hello</PopoverContent>
      </Popover>
    );
    const content = screen.getByText("Hello");
    expect(content.className).toMatch(/test-class/);
    expect(content.className).toMatch(/bg-popover/);
    expect(content.getAttribute("data-slot")).toBe("popover-content");
  });

  it("PopoverTrigger renders as a button with data-slot", () => {
    render(
      <Popover>
        <PopoverTrigger>Test Trigger</PopoverTrigger>
      </Popover>
    );
    const trigger = screen.getByText("Test Trigger");
    expect(trigger.tagName).toBe("BUTTON");
    expect(trigger.getAttribute("data-slot")).toBe("popover-trigger");
  });

  it("PopoverAnchor renders as a span with data-slot", () => {
    render(
      <Popover>
        <PopoverAnchor>Anchored</PopoverAnchor>
      </Popover>
    );
    const anchor = screen.getByText("Anchored");
    expect(anchor.tagName).toBe("SPAN");
    expect(anchor.getAttribute("data-slot")).toBe("popover-anchor");
  });
});
