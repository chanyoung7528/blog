import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isDev = process.env.NODE_ENV === "development";
export const isProd = process.env.NODE_ENV === "production";

export const rootUrl = () => {
  const root =
    process.env.NODE_ENV === "production"
      ? "https://imchanyo.github.io"
      : "http://localhost:3050";
  return root;
};
