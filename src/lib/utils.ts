import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const arraysEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((value, index) => value === sortedB[index]);
};

export const intersectionSize = (a: string[], b: string[]) => {
  const setA = new Set(a);
  const setB = new Set(b);
  return [...setA].filter(value => setB.has(value)).length;
};

export const containsAllCategories = (productCategories: string[], filterCategories: string[]) => {
  return filterCategories.every(category => productCategories.includes(category));
};