import type { Task } from "../model";
import { tasksData } from "./tasks.data";

export async function getTasks(): Promise<Task[]> {
    return tasksData;
}

export async function getTask(id: string): Promise<Task | undefined> {
    return tasksData.find(task => task.id === id);
}