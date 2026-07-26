/** Format a Date as a local calendar key `YYYY-MM-DD` (avoids UTC shift from toISOString). */
export function toDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

/** Parse a `YYYY-MM-DD` key into a local Date at midnight. */
export function parseDateKey(dateKey: string): Date {
    const [year, month, day] = dateKey.split("-").map(Number);
    return new Date(year, month - 1, day);
}

export function startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Monday-start week (ISO-style for UI consistency). */
export function startOfWeek(date: Date): Date {
    const result = startOfDay(date);
    const day = result.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    result.setDate(result.getDate() + diff);
    return result;
}

export function endOfWeek(date: Date): Date {
    const result = startOfWeek(date);
    result.setDate(result.getDate() + 6);
    return result;
}

export function startOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function isDateKeyInRange(dateKey: string, start: Date, end: Date): boolean {
    const value = parseDateKey(dateKey).getTime();
    return value >= startOfDay(start).getTime() && value <= startOfDay(end).getTime();
}
