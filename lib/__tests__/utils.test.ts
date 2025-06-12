import { cn } from "../utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("deduplicates using Tailwind rules", () => {
    expect(cn("p-2", "p-4", "p-2")).toBe("p-2");
  });
});