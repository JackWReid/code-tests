import { dedupeArray } from "../storage";

describe("dedupeArray", () => {
  it("dedupes an array of 2 identical", () => {
    expect(dedupeArray(["one", "one"])).toEqual(["one"]);
  });

  it("dedupes an array of 3 with two identical", () => {
    expect(dedupeArray(["one", "one", "two"])).toEqual(["one", "two"]);
  });

  it("preserves order", () => {
    expect(dedupeArray(["one", "two", "one", "three"])).toEqual([
      "one",
      "two",
      "three"
    ]);
  });
});
