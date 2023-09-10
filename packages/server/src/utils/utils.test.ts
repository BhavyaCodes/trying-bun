import { expect, test } from "bun:test";
import { calculateFib } from ".";

test("2 + 2", () => {
  expect(2 + 2).toBe(4);
});

test("fib(0) = 0", () => {
  expect(calculateFib(0)).toBe(0);
});

test("fib(1) = 1", () => {
  expect(calculateFib(1)).toBe(1);
});

test("fib(9) = 34", () => {
  expect(calculateFib(9)).toBe(34);
});

test("fib(NaN)", () => {
  expect(calculateFib(NaN)).toBe(0);
});
