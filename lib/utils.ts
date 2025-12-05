import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

function getError(error: unknown): string {
    if (error instanceof Error) return error.message
    return String(error)
}

function formatCurrency(amount?: number) {
    if (!amount && amount !== 0) return "KES 0"
    return `KES ${Math.round(amount)}`
}

function formatDate(ms?: number | string) {
    if (!ms) return "-"
    // handle seconds or milliseconds
    const n = Number(ms)
    const date = n > 1e12 ? new Date(n) : new Date(n * 1000)
    return date.toLocaleString()
}

function prettyStatus(status?: string) {
    if (!status) return "Unknown"
    return status.replace(/^OrderStatus\.?/i, "")
}

export { formatCurrency, formatDate, getError, prettyStatus }
