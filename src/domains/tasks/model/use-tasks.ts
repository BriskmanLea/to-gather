"use client";

import { useState } from "react";
import { createTask, deleteTask, toggleTaskStatus, updateTask } from "../api";
import type { TaskFormValues } from "./task-form-schema";
import type { Task } from "./types";

function toTaskInput(values: TaskFormValues) {
    return {
        title: values.title,
        description: values.description.trim() || undefined,
        priority: values.priority === "" ? null : values.priority,
        date: values.date,
        time: values.time.trim() || null,
    };
}

export function useTasks(initialTasks: Task[]) {
    const [tasks, setTasks] = useState(initialTasks);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deletingTask, setDeletingTask] = useState<Task | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    async function create(values: TaskFormValues) {
        const created = await createTask(toTaskInput(values));
        setTasks(current => [created, ...current]);
        setIsCreateOpen(false);
    }

    async function edit(values: TaskFormValues) {
        if (!editingTask) return;

        const updated = await updateTask(editingTask.id, toTaskInput(values));
        setTasks(current => current.map(task => (task.id === updated.id ? updated : task)));
        setEditingTask(null);
    }

    async function remove() {
        if (!deletingTask) return;

        await deleteTask(deletingTask.id);
        setTasks(current => current.filter(task => task.id !== deletingTask.id));
        setDeletingTask(null);
    }

    async function toggleComplete(task: Task) {
        const updated = await toggleTaskStatus(task.id);
        setTasks(current => current.map(item => (item.id === updated.id ? updated : item)));
    }

    async function assignTime(taskId: string, time: string | null) {
        const current = tasks.find(task => task.id === taskId);
        if (!current || current.time === time) return;

        const updated = await updateTask(taskId, { time });
        setTasks(items => items.map(item => (item.id === updated.id ? updated : item)));
    }

    return {
        tasks,
        editingTask,
        deletingTask,
        isCreateOpen,
        setEditingTask,
        setDeletingTask,
        setIsCreateOpen,
        create,
        edit,
        remove,
        toggleComplete,
        assignTime,
        closeEdit: () => setEditingTask(null),
        closeDelete: () => setDeletingTask(null),
        closeCreate: () => setIsCreateOpen(false),
    };
}
