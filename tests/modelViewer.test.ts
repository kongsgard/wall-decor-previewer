import { expect, test } from "vitest";
import {
  computePixelsToMetersScalingFactor,
  convertPixelsToMeters,
} from "../src/utils";

test("computePixelsToMetersScalingFactor should return 10^(num_digits) of max(width, height)", () => {
  expect(computePixelsToMetersScalingFactor(1, 1)).toBe(1);
  expect(computePixelsToMetersScalingFactor(500, 1)).toBe(100);
  expect(computePixelsToMetersScalingFactor(500, 2000)).toBe(1000);
});

test("convertPixelsToMeters should scale and round the pixels to two decimals precision", () => {
  expect(convertPixelsToMeters(1, 1)).toBe(1);
  expect(convertPixelsToMeters(100, 1)).toBe(100);
  expect(convertPixelsToMeters(100, 1.5)).toBe(66.67);
  expect(convertPixelsToMeters(200, 7)).toBe(28.57);
});
