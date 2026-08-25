"use client";

import { useState } from "react";
import {
    archiveHabit,
    createHabit,
    deleteHabit,
    toggleCompletion,
    unarchiveHabit,
    updateHabit
} from "../api";
import { frequencyFromForm } from "./habit-form-mappers";
import type { HabitFormValues } from "./habit-form-schema";
import type { Habit, HabitCompletion } from "./types";

function toHabitInput(values: HabitFormValues) {
    return {
        title: values.title,
        description: values.description.trim() || undefined,
        frequency: frequencyFromForm(values),
        color: values.color,
    };
}

export function useHabits(initialHabits: Habit[], initialCompletions: HabitCompletion[]) {
    const [habits, setHabits] = useState(initialHabits);
    const [completions, setCompletions] = useState(initialCompletions);
    const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
    const [archivingHabit, setArchivingHabit] = useState<Habit | null>(null);
    const [deletingHabit, setDeletingHabit] = useState<Habit | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    async function create(values: HabitFormValues) {
        const created = await createHabit(toHabitInput(values));
        setHabits(current => [created, ...current]);
        setIsCreateOpen(false);
    }

    async function edit(values: HabitFormValues) {
        if (!editingHabit) return;

        const updated = await updateHabit(editingHabit.id, toHabitInput(values));
        setHabits(current =>
            current.map(habit => (habit.id === updated.id ? updated : habit))
        );
        setEditingHabit(null);
    }

    async function archive() {
        if (!archivingHabit) return;

        const updated = await archiveHabit(archivingHabit.id);
        setHabits(current =>
            current.map(habit => (habit.id === updated.id ? updated : habit))
        );
        setArchivingHabit(null);
    }

    async function restore(habit: Habit) {
        const updated = await unarchiveHabit(habit.id);
        setHabits(current =>
            current.map(item => (item.id === updated.id ? updated : item))
        );
    }

    async function remove() {
        if (!deletingHabit) return;

        const id = deletingHabit.id;
        await deleteHabit(id);
        setHabits(current => current.filter(habit => habit.id !== id));
        setCompletions(current => current.filter(item => item.habitId !== id));
        setDeletingHabit(null);
    }

    async function toggle(habitId: string, date: string) {
        const result = await toggleCompletion(habitId, date);

        setCompletions(current => {
            if (!result.completed) {
                return current.filter(
                    item => !(item.habitId === habitId && item.date === date)
                );
            }

            if (!result.completion) {
                return current;
            }

            return [result.completion, ...current];
        });
    }

    return {
        habits,
        completions,
        editingHabit,
        archivingHabit,
        deletingHabit,
        isCreateOpen,
        setEditingHabit,
        setArchivingHabit,
        setDeletingHabit,
        setIsCreateOpen,
        create,
        edit,
        archive,
        restore,
        remove,
        toggle,
        closeEdit: () => setEditingHabit(null),
        closeArchive: () => setArchivingHabit(null),
        closeDelete: () => setDeletingHabit(null),
        closeCreate: () => setIsCreateOpen(false),
    };
}