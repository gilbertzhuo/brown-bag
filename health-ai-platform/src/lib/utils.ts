import { User } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeDelta(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const secs = Math.floor(seconds - hours * 3600 - minutes * 60);
  const parts = [];
  if (hours > 0) {
    parts.push(`${hours}h`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }
  if (secs > 0) {
    parts.push(`${secs}s`);
  }
  return parts.join(" ");
}

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export function translateToEnglish(data: User) {
  const {
    name,
    dateOfBirth,
    gender,
    height,
    weight,
    location,
    bloodPressure,
    medicalHistory,
    familyHistory,
  } = data;

  const sentence = `${name || "Unknown"} was born on ${
    dateOfBirth || "Unknown"
  } and is a ${gender?.toLowerCase() || "Unknown"} with a height of ${
    height || "Unknown"
  } and weight of ${weight || "Unknown"}. ${name || "They"} lives in ${
    location || "Unknown"
  } and has a blood pressure of ${bloodPressure || "Unknown"}. ${
    name || "Unknown"
  } has a medical history of "${
    medicalHistory || "Unknown"
  }" and a family history of "${familyHistory || "Unknown"}".`;

  return sentence;
}
