import { toDateKey } from "@/shared/lib";
import type { Habit, HabitCompletion } from "../model/types";
import { addDaysToDateKey } from "../lib/dates";
import { isDueOn } from "../lib/isDueOn";

const today = toDateKey(new Date());

export const habitsData: Habit[] = [
    {
        id: "habit-1",
        title: "Drink 2L of water",
        description: "Stay hydrated throughout the day",
        frequency: { type: "daily" },
        color: "#0d9488",
        archived: false,
        createdAt: "2026-05-01T08:00:00.000Z",
    },
    {
        id: "habit-2",
        title: "Morning stretching",
        frequency: { type: "daily" },
        color: "#2563eb",
        archived: false,
        createdAt: "2026-05-10T07:00:00.000Z",
    },
    {
        id: "habit-3",
        title: "Read every day",
        description: "At least 20 minutes",
        frequency: { type: "daily" },
        color: "#ca8a04",
        archived: false,
        createdAt: "2026-06-01T18:00:00.000Z",
    },
    {
        id: "habit-4",
        title: "Gym",
        frequency: { type: "weekly", daysOfWeek: [1, 3, 5] },
        color: "#dc2626",
        archived: false,
        createdAt: "2026-05-15T09:00:00.000Z",
    },
    {
        id: "habit-5",
        title: "Meditation",
        frequency: { type: "interval", everyDays: 2 },
        color: "#7c3aed",
        archived: false,
        createdAt: "2026-06-15T07:30:00.000Z",
    },
    {
        id: "habit-6",
        title: "Sleep before 23:00",
        frequency: { type: "daily" },
        color: "#059669",
        archived: false,
        createdAt: "2026-04-20T22:00:00.000Z",
    },
];

function buildCompletions(): HabitCompletion[] {
    const completions: HabitCompletion[] = [];
    let counter = 0;

    for (const habit of habitsData) {
        for (let offset = 84; offset >= 0; offset -= 1) {
            const date = addDaysToDateKey(today, -offset);

            if (!isDueOn(habit, date)) {
                continue;
            }

            const shouldComplete = (habit.id.charCodeAt(habit.id.length - 1) + offset) % 5 !== 0 && !(offset === 0 && habit.id === "habit-4");

            if (!shouldComplete) {
                continue;
            }

            counter += 1;
            completions.push({
                id: `completion-${counter}`,
                habitId: habit.id,
                date,
                completedAt: `${date}T12:00:00.000Z`,
            });
        }
    }

    return completions;
}

export const habitCompletionsData: HabitCompletion[] = buildCompletions();