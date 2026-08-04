import type { TaskPriority, TaskStatus } from "@/entities/task";

export type { Task, TaskPriority, TaskStatus } from "@/entities/task";

export type TasksView = "day" | "week" | "month";

export type DayDisplayMode = "list" | "schedule";

export type TaskFiltersState = {
    search: string;
    status: TaskStatus | "all";
    priority: TaskPriority | "all";
};
