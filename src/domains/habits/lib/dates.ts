import { parseDateKey, toDateKey } from "@/shared/lib";
import type { Habit } from "../model/types";

/** Inclusive list of `YYYY-MM-DD` keys from `from` to `to`. */
export function eachDateKey(from: string, to: string): string[] {
    const keys: string[] = [];
    const cursor = parseDateKey(from);
    const end = parseDateKey(to);

    while (cursor.getTime() <= end.getTime()) {
        keys.push(toDateKey(cursor));
        cursor.setDate(cursor.getDate() + 1);
    }

    return keys;
}

export function addDaysToDateKey(dateKey: string, days: number): string {
    const date = parseDateKey(dateKey);
    date.setDate(date.getDate() + days);
    return toDateKey(date);
}

/** Whole calendar days from `from` to `to` (can be negative). */
export function daysBetween(from: string, to: string): number {
    const start = parseDateKey(from).getTime();
    const end = parseDateKey(to).getTime();
    return Math.round((end - start) / (24 * 60 * 60 * 1000));
}

export function habitCreatedDateKey(habit: Habit): string {
    return toDateKey(new Date(habit.createdAt));
}