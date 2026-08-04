import type { Task } from "@/entities/task";
import { TaskItem } from "./TaskItem";
import { TasksEmptyState } from "./TasksEmptyState";

type Props = {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
    onToggleComplete: (task: Task) => void;
};

export function TasksList({ tasks, onEdit, onDelete, onToggleComplete }: Props) {
    if (!tasks.length) {
        return <TasksEmptyState />;
    }

    return (
        <div className="space-y-2">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleComplete={onToggleComplete}
                />
            ))}
        </div>
    );
}