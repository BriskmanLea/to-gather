import type { HabitFormValues } from "./habit-form-schema";
import type { HabitFrequency } from "./types";

export function frequencyFromForm(values: HabitFormValues): HabitFrequency {
    if (values.frequencyType === "weekly") {
        return {
            type: "weekly",
            daysOfWeek: [...values.daysOfWeek].sort((a, b) => a - b),
        };
    }

    if (values.frequencyType === "interval") {
        return {
            type: "interval",
            everyDays: values.everyDays,
        };
    }

    return { type: "daily" };
}

export function formValuesFromHabit(habit: {
    title: string;
    description?: string;
    frequency: HabitFrequency;
    color: string;
}): HabitFormValues {
    const frequency = habit.frequency;

    return {
        title: habit.title,
        description: habit.description ?? "",
        frequencyType: frequency.type,
        daysOfWeek: frequency.type === "weekly" ? [...frequency.daysOfWeek] : [],
        everyDays: frequency.type === "interval" ? frequency.everyDays : 2,
        color: habit.color,
    };
}