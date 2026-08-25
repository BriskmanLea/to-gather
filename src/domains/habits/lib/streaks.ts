import type { Habit, HabitCompletion } from "../model/types";
import { isCompletedOn } from "./completions";
import { addDaysToDateKey, eachDateKey, habitCreatedDateKey } from "./dates";
import { isDueOn } from "./isDueOn";

export function currentStreak(
    habit: Habit,
    completions: HabitCompletion[],
    asOfDateKey: string
): number {
    let streak = 0;
    let cursor = asOfDateKey;
    const createdKey = habitCreatedDateKey(habit);

    while (cursor >= createdKey) {
        if (!isDueOn(habit, cursor)) {
            cursor = addDaysToDateKey(cursor, -1);
            continue;
        }

        if (isCompletedOn(completions, habit.id, cursor)) {
            streak += 1;
            cursor = addDaysToDateKey(cursor, -1);
            continue;
        }

        // Today can still be incomplete without breaking prior streak.
        if (cursor === asOfDateKey) {
            cursor = addDaysToDateKey(cursor, -1);
            continue;
        }

        break;
    }

    return streak;
}

export function longestStreak(
    habit: Habit,
    completions: HabitCompletion[],
    asOfDateKey: string
): number {
    const createdKey = habitCreatedDateKey(habit);
    const dueDays = eachDateKey(createdKey, asOfDateKey).filter(dateKey =>
        isDueOn(habit, dateKey)
    );

    let longest = 0;
    let current = 0;

    for (const dateKey of dueDays) {
        if (isCompletedOn(completions, habit.id, dateKey)) {
            current += 1;
            longest = Math.max(longest, current);
        } else {
            current = 0;
        }
    }

    return longest;
}