import type { Task } from "../model";
import { TaskItem } from "./TaskItem";
import { TasksEmptyState } from "./TasksEmptyState";

type Props = {
    tasks: Task[];
};

export function TasksList({ tasks }: Props) {
    if (!tasks.length) {
        return <TasksEmptyState />;
    }

    return (
        <div className="space-y-4">
            {tasks.map(task => <TaskItem key={task.id} task={task} />)}
        </div>
    );
}