import { Item } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterItems(items: Item[]) {
  return items.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  }));
}
