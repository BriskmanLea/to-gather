import type { Habit, HabitCompletion, HabitStats } from "../model/types";
import { isCompletedOn } from "./completions";
import { eachDateKey } from "./dates";
import { isDueOn } from "./isDueOn";
import { currentStreak, longestStreak } from "./streaks";

export function completionRate(
    habit: Habit,
    completions: HabitCompletion[],
    fromDateKey: string,
    toDateKey: string
): { rate: number; completedDue: number; dueCount: number } {
    const dueDays = eachDateKey(fromDateKey, toDateKey).filter(dateKey =>
        isDueOn(habit, dateKey)
    );
    const dueCount = dueDays.length;
    const completedDue = dueDays.filter(dateKey =>
        isCompletedOn(completions, habit.id, dateKey)
    ).length;
    const rate = dueCount === 0 ? 0 : Math.round((completedDue / dueCount) * 100);

    return { rate, completedDue, dueCount };
}

export function getHabitStats(
    habit: Habit,
    completions: HabitCompletion[],
    fromDateKey: string,
    toDateKey: string
): HabitStats {
    const { rate, completedDue, dueCount } = completionRate(
        habit,
        completions,
        fromDateKey,
        toDateKey
    );

    return {
        habitId: habit.id,
        currentStreak: currentStreak(habit, completions, toDateKey),
        longestStreak: longestStreak(habit, completions, toDateKey),
        completionRate: rate,
        completedDue,
        dueCount,
    };
}

export function dayCompletionIntensity(
    habits: Habit[],
    completions: HabitCompletion[],
    dateKey: string
): { due: number; completed: number; ratio: number } {
    const dueHabits = habits.filter(habit => !habit.archived && isDueOn(habit, dateKey));
    const due = dueHabits.length;
    const completed = dueHabits.filter(habit =>
        isCompletedOn(completions, habit.id, dateKey)
    ).length;
    const ratio = due === 0 ? 0 : completed / due;

    return { due, completed, ratio };
}