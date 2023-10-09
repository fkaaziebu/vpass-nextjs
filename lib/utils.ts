import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateString(
  length: number,
  options: {
    numeric?: boolean;
    uppercase?: boolean;
    lowercase?: boolean;
    symbols?: boolean;
  }
): string {
  let raw = "";

  if (options.numeric) {
    raw += "0123456789";
  }

  if (options.uppercase) {
    raw += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  if (options.lowercase) {
    raw += "abcdefghijklmnopqrstuvwxyz";
  }

  if (options.symbols) {
    raw += "~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
  }

  let result = "";

  for (let i = 0; i < length; i++) {
    result += raw[Math.floor(Math.random() * raw.length)];
  }

  return result;
}
