import type { TaskPriority, TaskStatus, TasksView } from "../model";
import { TasksDatePicker } from "./TasksDatePicker";
import { TasksFilters } from "./TasksFilters";
import { TasksSearch } from "./TasksSearch";
import { TasksViewTabs } from "./TasksViewTabs";

type Props = {
    view: TasksView;
    selectedDate: Date;
    search: string;
    status: TaskStatus | "all";
    priority: TaskPriority | "all";
    onViewChange: (view: TasksView) => void;
    onDateChange: (date: Date) => void;
    onSearchChange: (value: string) => void;
    onStatusChange: (status: TaskStatus | "all") => void;
    onPriorityChange: (priority: TaskPriority | "all") => void;
};

export function TasksToolbar(props: Props) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <TasksViewTabs
                    value={props.view}
                    onChange={props.onViewChange}
                />

                <TasksDatePicker
                    value={props.selectedDate}
                    onChange={props.onDateChange}
                />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <TasksSearch
                    value={props.search}
                    onChange={props.onSearchChange}
                />

                <TasksFilters
                    status={props.status}
                    priority={props.priority}
                    onStatusChange={props.onStatusChange}
                    onPriorityChange={props.onPriorityChange}
                />
            </div>
        </div>
    );
}