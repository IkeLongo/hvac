import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns a randomly shuffled subset of `items` with at most `count` entries.
 * Uses Fisher-Yates on a shallow copy so the original array is never mutated.
 * Safe when the array has fewer items than `count` — returns all items.
 */
export function getRandomItems<T>(items: T[], count: number): T[] {
  if (!items || items.length === 0) return [];
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}
