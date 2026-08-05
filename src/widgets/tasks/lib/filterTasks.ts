import type { Task, TaskPriority, TaskStatus } from "@/entities/task";
import { endOfMonth, endOfWeek, isDateKeyInRange, startOfMonth, startOfWeek, toDateKey } from "@/shared/lib";
import type { TasksView } from "../model/types";

type FilterParams = {
    tasks: Task[];
    view: TasksView;
    selectedDate: Date;
    search: string;
    status: TaskStatus | "all";
    priority: TaskPriority | "all";
};

function matchesView(taskDate: string, view: TasksView, selectedDate: Date): boolean {
    if (view === "day") {
        return taskDate === toDateKey(selectedDate);
    }

    if (view === "week") {
        return isDateKeyInRange(taskDate, startOfWeek(selectedDate), endOfWeek(selectedDate));
    }

    return isDateKeyInRange(taskDate, startOfMonth(selectedDate), endOfMonth(selectedDate));
}

export function filterTasks({ tasks, view, selectedDate, search, status, priority }: FilterParams): Task[] {
    const normalizedSearch = search.trim().toLowerCase();

    return tasks.filter(task => {
        if (!matchesView(task.date, view, selectedDate)) {
            return false;
        }

        if (status !== "all" && task.status !== status) {
            return false;
        }

        if (priority !== "all" && task.priority !== priority) {
            return false;
        }

        if (normalizedSearch && !task.title.toLowerCase().includes(normalizedSearch)) {
            return false;
        }

        return true;
    });
}