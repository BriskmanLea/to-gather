import type { HabitCompletion } from "../model/types";

export function isCompletedOn(
    completions: HabitCompletion[],
    habitId: string,
    dateKey: string
): boolean {
    return completions.some(completion => completion.habitId === habitId && completion.date === dateKey);
}

export function completionsForHabit(
    completions: HabitCompletion[],
    habitId: string
): HabitCompletion[] {
    return completions.filter(completion => completion.habitId === habitId);
}