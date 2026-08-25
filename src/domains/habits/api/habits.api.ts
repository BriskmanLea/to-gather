import type { Habit, HabitCompletion, HabitFrequency } from "../model/types";
import { DEFAULT_HABIT_COLOR } from "../model/constants";
import { habitCompletionsData, habitsData } from "./habits.data";

export type CreateHabitInput = {
    title: string;
    description?: string;
    frequency: HabitFrequency;
    color?: string;
};

export type UpdateHabitInput = {
    title?: string;
    description?: string;
    frequency?: HabitFrequency;
    color?: string;
    archived?: boolean;
};

// TODO(backend): remove in-memory store once habits API is wired
let habitsStore: Habit[] = structuredClone(habitsData);
let completionsStore: HabitCompletion[] = structuredClone(habitCompletionsData);

function cloneHabit(habit: Habit): Habit {
    return {
        ...habit,
        frequency:
            habit.frequency.type === "weekly" ? { type: "weekly", daysOfWeek: [...habit.frequency.daysOfWeek] } : { ...habit.frequency },
    };
}

function cloneCompletion(completion: HabitCompletion): HabitCompletion {
    return { ...completion };
}

/** TODO(backend): fetch habit list */
export async function getHabits(): Promise<Habit[]> {
    return habitsStore.map(cloneHabit);
}

/** TODO(backend): fetch a single habit */
export async function getHabit(id: string): Promise<Habit | undefined> {
    const habit = habitsStore.find(item => item.id === id);
    return habit ? cloneHabit(habit) : undefined;
}

/** TODO(backend): create habit */
export async function createHabit(input: CreateHabitInput): Promise<Habit> {
    const habit: Habit = {
        id: crypto.randomUUID(),
        title: input.title,
        description: input.description,
        frequency: input.frequency,
        color: input.color ?? DEFAULT_HABIT_COLOR,
        archived: false,
        createdAt: new Date().toISOString(),
    };

    habitsStore = [habit, ...habitsStore];
    return cloneHabit(habit);
}

/** TODO(backend): update habit */
export async function updateHabit(id: string, input: UpdateHabitInput): Promise<Habit> {
    const index = habitsStore.findIndex(habit => habit.id === id);

    if (index === -1) {
        throw new Error(`Habit not found: ${id}`);
    }

    const current = habitsStore[index];
    const updated: Habit = {
        ...current,
        ...input,
        description:
            input.description === undefined ? current.description : input.description || undefined,
        frequency: input.frequency ?? current.frequency,
        color: input.color ?? current.color,
        archived: input.archived ?? current.archived,
    };

    habitsStore = [
        ...habitsStore.slice(0, index),
        updated,
        ...habitsStore.slice(index + 1),
    ];

    return cloneHabit(updated);
}

/** TODO(backend): soft-archive habit */
export async function archiveHabit(id: string): Promise<Habit> {
    return updateHabit(id, { archived: true });
}

/** TODO(backend): restore habit from archive */
export async function unarchiveHabit(id: string): Promise<Habit> {
    return updateHabit(id, { archived: false });
}

/** TODO(backend): permanently delete habit and its completions */
export async function deleteHabit(id: string): Promise<void> {
    const exists = habitsStore.some(habit => habit.id === id);

    if (!exists) {
        throw new Error(`Habit not found: ${id}`);
    }

    habitsStore = habitsStore.filter(habit => habit.id !== id);
    completionsStore = completionsStore.filter(completion => completion.habitId !== id);
}

/** TODO(backend): fetch completions in an inclusive date range */
export async function getCompletions(range?: {
    from?: string;
    to?: string;
}): Promise<HabitCompletion[]> {
    return completionsStore
        .filter(completion => {
            if (range?.from && completion.date < range.from) {
                return false;
            }

            if (range?.to && completion.date > range.to) {
                return false;
            }

            return true;
        })
        .map(cloneCompletion);
}

/** TODO(backend): toggle completion for a habit on a date */
export async function toggleCompletion(
    habitId: string,
    date: string
): Promise<{ completed: boolean; completion: HabitCompletion | null }> {
    const habit = habitsStore.find(item => item.id === habitId);

    if (!habit) {
        throw new Error(`Habit not found: ${habitId}`);
    }

    const existingIndex = completionsStore.findIndex(
        item => item.habitId === habitId && item.date === date
    );

    if (existingIndex !== -1) {
        completionsStore = [
            ...completionsStore.slice(0, existingIndex),
            ...completionsStore.slice(existingIndex + 1),
        ];
        return { completed: false, completion: null };
    }

    const completion: HabitCompletion = {
        id: crypto.randomUUID(),
        habitId,
        date,
        completedAt: new Date().toISOString(),
    };

    completionsStore = [completion, ...completionsStore];
    return { completed: true, completion: cloneCompletion(completion) };
}