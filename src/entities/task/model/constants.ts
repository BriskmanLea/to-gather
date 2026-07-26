import type { TaskPriority, TaskStatus } from "./types";

export const TASK_PRIORITIES: ReadonlyArray<{ value: TaskPriority; label: string }> = [
    {
        value: "high",
        label: "High",
    },
    {
        value: "medium",
        label: "Medium",
    },
    {
        value: "low",
        label: "Low",
    },
];

export const TASK_STATUSES: ReadonlyArray<{ value: TaskStatus; label: string }> = [
    {
        value: "todo",
        label: "To do",
    },
    {
        value: "completed",
        label: "Completed",
    },
];
