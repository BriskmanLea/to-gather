import type { TaskPriority, TaskStatus } from "../model";
import { Dropdown } from "@/shared/ui";

type Props = {
    status: TaskStatus | "all";
    priority: TaskPriority | "all";
    onStatusChange: (value: TaskStatus | "all") => void;
    onPriorityChange: (value: TaskPriority | "all") => void;
};

const statusOptions = [
    { value: "all", label: "All statuses" },
    { value: "todo", label: "To do" },
    { value: "completed", label: "Completed" },
];

const priorityOptions = [
    { value: "all", label: "All priorities" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
];

export function TasksFilters({ status, priority, onStatusChange, onPriorityChange }: Props) {
    return (
        <div className="flex justify-between gap-4">
            <Dropdown options={statusOptions} value={status} onChange={(e) => onStatusChange(e.target.value as TaskStatus | "all")} />

            <Dropdown options={priorityOptions} value={priority} onChange={(e) => onPriorityChange(e.target.value as TaskPriority | "all")} />
        </div>
    );
}