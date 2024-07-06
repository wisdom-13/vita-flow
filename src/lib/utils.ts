import { type ClassValue, clsx } from "clsx"
import { Timestamp } from 'firebase/firestore';
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (timestamp: Timestamp) => {
  const date = timestamp.toDate();
  const year = String(date.getFullYear()).slice(2); // 두 자리 연도
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 두 자리 월
  const day = String(date.getDate()).padStart(2, '0'); // 두 자리 일
  return `${year}.${month}.${day}`;
};

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

export const pickRandomElements = (arr: any[], count: number) => {
  if (arr.length < count) {
    return arr;
  }

  const pickedElements: any[] = [];

  while (pickedElements.length < count) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomElement = arr[randomIndex];

    if (!pickedElements.includes(randomElement)) {
      pickedElements.push(randomElement);
    }
  }

  return pickedElements;
}