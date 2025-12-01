/**
 * Format duration in minutes to a human-readable string
 * @param minutes Duration in minutes
 * @returns Formatted string (e.g., "23 min", "1h", "8h 11m")
 */
export function formatDuration(minutes: number): string {
    if (minutes < 60) {
        return `${minutes} min`
    }
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`
}
