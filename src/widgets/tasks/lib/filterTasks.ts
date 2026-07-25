import type { Task, TaskPriority, TaskStatus, TasksView } from "../model";

type FilterParams = {
    tasks: Task[];
    view: TasksView;
    selectedDate: Date;
    search: string;
    status: TaskStatus | "all";
    priority: TaskPriority | "all";
};

export function filterTasks({ tasks, view, selectedDate, search, status, priority }: FilterParams): Task[] {
    const selected = selectedDate.toISOString().split("T")[0];

    const normalizedSearch = search.trim().toLowerCase();

    return tasks.filter((task) => {
        if (
            view === "day" &&
            task.date !== selected
        ) {
            return false;
        }

        if (
            status !== "all" &&
            task.status !== status
        ) {
            return false;
        }

        if (
            priority !== "all" &&
            task.priority !== priority
        ) {
            return false;
        }

        if (
            normalizedSearch &&
            !task.title
                .toLowerCase()
                .includes(normalizedSearch)
        ) {
            return false;
        }

        return true;
    });
}