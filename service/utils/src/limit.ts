export function LimitSize(value: number, min = 0, max = Infinity) {
  return Math.min(Math.max(value, min), max);
}
