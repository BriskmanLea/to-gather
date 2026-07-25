"use client";

import { useMemo, useState } from "react";
import type { Task, TaskPriority, TaskStatus, TasksView } from "@/widgets/tasks";
import { TasksHeader, TasksList, TasksSummary, TasksToolbar } from "@/widgets/tasks";
import { filterTasks } from "@/widgets/tasks/lib/filterTasks";

type TasksContentProps = {
    tasks: Task[];
};

export function TasksContent({ tasks }: TasksContentProps) {
    const [view, setView] = useState<TasksView>("day");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<TaskStatus | "all">("all");
    const [priority, setPriority] = useState<TaskPriority | "all">("all");

    const filteredTasks = useMemo(
        () => filterTasks({ tasks, view, selectedDate, search, status, priority }), [tasks, view, selectedDate, search, status, priority]
    );

    const total = filteredTasks.length;
    const completed = filteredTasks.filter(task => task.status === "completed").length;
    const todo = total - completed;

    return (
        <div className="flex flex-col gap-4 max-w-6xl mx-auto">
            <TasksHeader />

            <TasksToolbar
                view={view}
                selectedDate={selectedDate}
                search={search}
                status={status}
                priority={priority}
                onViewChange={setView}
                onDateChange={setSelectedDate}
                onSearchChange={setSearch}
                onStatusChange={setStatus}
                onPriorityChange={setPriority}
            />

            <TasksSummary
                total={total}
                todo={todo}
                completed={completed}
            />

            <TasksList
                tasks={filteredTasks}
            />
        </div>
    );
}