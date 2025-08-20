import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const BACKEND_URL = 'http://localhost:8001'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
