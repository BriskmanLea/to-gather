import type { Habit } from "../model/types";
import { isDueOn } from "./isDueOn";

export function filterActiveHabits(habits: Habit[]): Habit[] {
    return habits.filter(habit => !habit.archived);
}

export function habitsDueOn(habits: Habit[], dateKey: string): Habit[] {
    return filterActiveHabits(habits).filter(habit => isDueOn(habit, dateKey));
}