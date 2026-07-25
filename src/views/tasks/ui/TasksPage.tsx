import { getTasks } from "@/widgets/tasks";
import { TasksContent } from "./TasksContent";

export async function TasksPage() {
    const tasks = await getTasks();

    return <TasksContent tasks={tasks} />
}