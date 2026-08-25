import {
    endOfMonth,
    endOfWeek,
    startOfDay,
    startOfMonth,
    startOfWeek,
    toDateKey
} from "@/shared/lib";
import type { HabitsPeriod } from "../model/types";

export function getPeriodRange(
    period: HabitsPeriod,
    anchor: Date = new Date()
): { from: string; to: string } {
    const todayKey = toDateKey(new Date());

    if (period === "week") {
        return {
            from: toDateKey(startOfWeek(anchor)),
            to: toDateKey(endOfWeek(anchor)),
        };
    }

    if (period === "month") {
        return {
            from: toDateKey(startOfMonth(anchor)),
            to: toDateKey(endOfMonth(anchor)),
        };
    }

    const yearStart = new Date(anchor.getFullYear(), 0, 1);
    const yearEnd = new Date(anchor.getFullYear(), 11, 31);
    const yearEndKey = toDateKey(yearEnd);

    return {
        from: toDateKey(yearStart),
        to: yearEndKey > todayKey ? todayKey : yearEndKey,
    };
}

/** Inclusive date range for the consistency calendar / year chart. */
export function getHeatmapRange(
    period: HabitsPeriod,
    anchor: Date = new Date()
): { from: string; to: string } {
    if (period === "week" || period === "month") {
        return getPeriodRange(period, anchor);
    }

    // Full calendar year, padded to Monday–Sunday weeks.
    const yearStart = new Date(anchor.getFullYear(), 0, 1);
    const yearEnd = new Date(anchor.getFullYear(), 11, 31);

    return {
        from: toDateKey(startOfWeek(yearStart)),
        to: toDateKey(endOfWeek(yearEnd)),
    };
}

export function shiftPeriodAnchor(
    period: HabitsPeriod,
    anchor: Date,
    delta: number
): Date {
    const next = startOfDay(anchor);

    if (period === "week") {
        next.setDate(next.getDate() + delta * 7);
        return next;
    }

    if (period === "month") {
        next.setMonth(next.getMonth() + delta);
        return next;
    }

    next.setFullYear(next.getFullYear() + delta);
    return next;
}

/** True when the visible period is already the current week/month/year. */
export function isPeriodAtPresent(period: HabitsPeriod, anchor: Date): boolean {
    const today = startOfDay(new Date());

    if (period === "week") {
        return startOfWeek(anchor).getTime() >= startOfWeek(today).getTime();
    }

    if (period === "month") {
        return startOfMonth(anchor).getTime() >= startOfMonth(today).getTime();
    }

    return anchor.getFullYear() >= today.getFullYear();
}