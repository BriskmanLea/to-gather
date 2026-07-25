export type TaskPriority = "low" | "medium" | "high";

export type TaskStatus = "todo" | "completed";

export type TasksView = "day" | "week" | "month";

export type Task = {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    date: string;
    time: string | null;
    createdAt: string;
    completedAt?: string;
};

export type TaskFiltersState = {
    search: string;
    status: TaskStatus | "all";
    priority: TaskPriority | "all";
};