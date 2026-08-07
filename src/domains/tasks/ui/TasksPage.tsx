import { getTasks } from "../api";
import { TasksFeatureGate } from "./TasksFeatureGate";

export async function TasksPage() {
    const tasks = await getTasks();

    return <TasksFeatureGate tasks={tasks} />;
}