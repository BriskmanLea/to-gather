"use client";

import { useMemo, useState } from "react";
import { toDateKey } from "@/shared/lib";
import { useCurrentUserStore } from "@/domains/user";
import { filterTasks } from "../lib/filterTasks";
import { useTasks } from "../model";
import type { DayDisplayMode, Task, TaskPriority, TaskStatus, TasksView } from "../model";
import { TaskModals } from "./TaskModals";
import { TasksDayModeToggle } from "./TasksDayModeToggle";
import { TasksEmptyState } from "./TasksEmptyState";
import { TasksHeader } from "./TasksHeader";
import { TasksList } from "./TasksList";
import { TasksSchedule } from "./TasksSchedule";
import { TasksSummary } from "./TasksSummary";
import { TasksToolbar } from "./TasksToolbar";

type TasksContentProps = {
    tasks: Task[];
};

export function TasksContent({ tasks: initialTasks }: TasksContentProps) {
    const {
        tasks,
        editingTask,
        deletingTask,
        isCreateOpen,
        setEditingTask,
        setDeletingTask,
        setIsCreateOpen,
        create,
        edit,
        remove,
        toggleComplete,
        assignTime,
        closeEdit,
        closeDelete,
        closeCreate,
    } = useTasks(initialTasks);

    const dayStartHour = useCurrentUserStore(state => state.tasksPreferences.dayStartHour);
    const [view, setView] = useState<TasksView>("day");
    const [dayDisplayMode, setDayDisplayMode] = useState<DayDisplayMode>("list");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<TaskStatus | "all">("all");
    const [priority, setPriority] = useState<TaskPriority | "all">("all");

    const filteredTasks = useMemo(
        () => filterTasks({ tasks, view, selectedDate, search, status, priority }),
        [tasks, view, selectedDate, search, status, priority]
    );

    const total = filteredTasks.length;
    const completed = filteredTasks.filter(task => task.status === "completed").length;
    const todo = total - completed;

    return (
        <div className="flex flex-col gap-4 max-w-6xl mx-auto">
            <TasksHeader onCreateClick={() => setIsCreateOpen(true)} />

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

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <TasksSummary total={total} todo={todo} completed={completed} />

                {view === "day" ? (
                    <TasksDayModeToggle
                        value={dayDisplayMode}
                        onChange={setDayDisplayMode}
                    />
                ) : null}
            </div>

            {filteredTasks.length === 0 ? (
                <TasksEmptyState />
            ) : view === "day" && dayDisplayMode === "schedule" ? (
                <TasksSchedule
                    tasks={filteredTasks}
                    dayStartHour={dayStartHour}
                    onEdit={setEditingTask}
                    onDelete={setDeletingTask}
                    onToggleComplete={toggleComplete}
                    onAssignTime={assignTime}
                />
            ) : (
                <TasksList
                    tasks={filteredTasks}
                    onEdit={setEditingTask}
                    onDelete={setDeletingTask}
                    onToggleComplete={toggleComplete}
                />
            )}

            <TaskModals
                isCreateOpen={isCreateOpen}
                createDefaultDate={toDateKey(selectedDate)}
                editingTask={editingTask}
                deletingTask={deletingTask}
                onCloseCreate={closeCreate}
                onCloseEdit={closeEdit}
                onCloseDelete={closeDelete}
                onCreate={create}
                onSave={edit}
                onConfirmDelete={remove}
            />
        </div>
    );
}