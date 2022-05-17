import { MotionValue, useMotionValue } from "framer-motion";

export function makeZeroArrayOfLengthN(n: number): any[] {
  return Array.from({ length: n }, (_, i) => 0);
}

export function makeSequenceArrayOfLengthN(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i);
}

export function makeZeroArrayOfLengthNMotionValuePairs(
  n: number
): MotionValue<number>[][] {
  return Array.from({ length: n }, (_, i) => [
    useMotionValue(0),
    useMotionValue(0),
  ]);
}
