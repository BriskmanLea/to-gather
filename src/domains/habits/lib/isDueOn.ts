import { parseDateKey } from "@/shared/lib";
import type { Habit } from "../model/types";
import { daysBetween, habitCreatedDateKey } from "./dates";

export function isDueOn(habit: Habit, dateKey: string): boolean {
    const createdKey = habitCreatedDateKey(habit);

    if (dateKey < createdKey) {
        return false;
    }

    const frequency = habit.frequency;

    if (frequency.type === "daily") {
        return true;
    }

    if (frequency.type === "weekly") {
        const day = parseDateKey(dateKey).getDay();
        return frequency.daysOfWeek.includes(day);
    }

    const offset = daysBetween(createdKey, dateKey);
    return offset >= 0 && offset % frequency.everyDays === 0;
}