import { expect, test } from "vitest";
import { sum } from "./sum";


test("Addition of 2 plus 3 is 5", () => {
    expect(sum(2, 3)).toBe(5);
});