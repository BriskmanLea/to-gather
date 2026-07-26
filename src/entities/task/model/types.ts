export type TaskPriority = "low" | "medium" | "high";

export type TaskStatus = "todo" | "completed";

export type Task = {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    /** Local calendar date as `YYYY-MM-DD` */
    date: string;
    /** Local time as `HH:mm`, or null when unset */
    time: string | null;
    createdAt: string;
    completedAt?: string;
};
