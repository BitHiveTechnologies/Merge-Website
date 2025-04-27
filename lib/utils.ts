import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const BACKEND_URL = 'https://merge-backend-production.up.railway.app'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
