import type { Task, TaskPriority, TaskStatus } from "@/entities/task";
import { tasksData } from "./tasks.data";

export type CreateTaskInput = {
    title: string;
    description?: string;
    priority: TaskPriority | null;
    date: string;
    time: string | null;
};

export type UpdateTaskInput = {
    title?: string;
    description?: string;
    priority?: TaskPriority | null;
    date?: string;
    time?: string | null;
    status?: TaskStatus;
};

// TODO(backend): remove in-memory store once tasks API is wired
let tasksStore: Task[] = structuredClone(tasksData);

function cloneTask(task: Task): Task {
    return { ...task };
}

/** TODO(backend): fetch task list */
export async function getTasks(): Promise<Task[]> {
    return tasksStore.map(cloneTask);
}

/** TODO(backend): fetch a single task */
export async function getTask(id: string): Promise<Task | undefined> {
    const task = tasksStore.find(item => item.id === id);
    return task ? cloneTask(task) : undefined;
}

/** TODO(backend): create task */
export async function createTask(input: CreateTaskInput): Promise<Task> {
    const task: Task = {
        id: crypto.randomUUID(),
        title: input.title,
        description: input.description,
        status: "todo",
        priority: input.priority,
        date: input.date,
        time: input.time,
        createdAt: new Date().toISOString()
    };

    tasksStore = [task, ...tasksStore];
    return cloneTask(task);
}

/** TODO(backend): update task */
export async function updateTask(id: string, input: UpdateTaskInput): Promise<Task> {
    const index = tasksStore.findIndex(task => task.id === id);

    if (index === -1) {
        throw new Error(`Task not found: ${id}`);
    }

    const current = tasksStore[index];
    const nextStatus = input.status ?? current.status;

    const updated: Task = {
        ...current,
        ...input,
        description: input.description === undefined ? current.description : input.description || undefined,
        status: nextStatus,
        completedAt: nextStatus === "completed" ? current.completedAt ?? new Date().toISOString() : undefined
    };

    tasksStore = [
        ...tasksStore.slice(0, index),
        updated,
        ...tasksStore.slice(index + 1),
    ];

    return cloneTask(updated);
}

/** TODO(backend): delete task */
export async function deleteTask(id: string): Promise<void> {
    const exists = tasksStore.some(task => task.id === id);

    if (!exists) {
        throw new Error(`Task not found: ${id}`);
    }

    tasksStore = tasksStore.filter(task => task.id !== id);
}

/** TODO(backend): toggle endpoint */
export async function toggleTaskStatus(id: string): Promise<Task> {
    const task = tasksStore.find(item => item.id === id);

    if (!task) {
        throw new Error(`Task not found: ${id}`);
    }

    return updateTask(id, { status: task.status === "completed" ? "todo" : "completed" });
}
