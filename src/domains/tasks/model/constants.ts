import type { DayDisplayMode, TaskPriority, TaskStatus, TasksView } from "./types";

export const TASK_PRIORITIES: ReadonlyArray<{ value: TaskPriority; label: string }> = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
];

export const TASK_STATUSES: ReadonlyArray<{ value: TaskStatus; label: string }> = [
    { value: "todo", label: "To do" },
    { value: "completed", label: "Completed" },
];

export const TASK_VIEWS: ReadonlyArray<{ value: TasksView; label: string }> = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
];

export const DAY_DISPLAY_MODES: ReadonlyArray<{ value: DayDisplayMode; label: string }> = [
    { value: "list", label: "List" },
    { value: "schedule", label: "Schedule" },
];
