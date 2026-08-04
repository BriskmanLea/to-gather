"use client";

import { useMemo, useState } from "react";
import type { DayDisplayMode, Task, TaskPriority, TaskStatus, TasksView } from "@/widgets/tasks";
import { createTask, deleteTask, toggleTaskStatus, updateTask, TasksDayModeToggle, TasksEmptyState, TasksHeader, TasksList, TasksSchedule, TasksSummary, TasksToolbar } from "@/widgets/tasks";
import { filterTasks } from "@/widgets/tasks/lib/filterTasks";
import { CreateTaskModal, type TaskFormValues } from "@/features/tasks/create";
import { EditTaskModal } from "@/features/tasks/edit";
import { DeleteTaskModal } from "@/features/tasks/delete";
import { toDateKey } from "@/shared/lib";

type TasksContentProps = {
    tasks: Task[];
};

function toTaskInput(values: TaskFormValues) {
    return {
        title: values.title,
        description: values.description.trim() || undefined,
        priority: values.priority === "" ? null : values.priority,
        date: values.date,
        time: values.time.trim() || null,
    };
}

export function TasksContent({ tasks: initialTasks }: TasksContentProps) {
    const [tasks, setTasks] = useState(initialTasks);
    const [view, setView] = useState<TasksView>("day");
    const [dayDisplayMode, setDayDisplayMode] = useState<DayDisplayMode>("list");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<TaskStatus | "all">("all");
    const [priority, setPriority] = useState<TaskPriority | "all">("all");
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deletingTask, setDeletingTask] = useState<Task | null>(null);

    const filteredTasks = useMemo(
        () => filterTasks({ tasks, view, selectedDate, search, status, priority }),
        [tasks, view, selectedDate, search, status, priority]
    );

    const total = filteredTasks.length;
    const completed = filteredTasks.filter((task) => task.status === "completed").length;
    const todo = total - completed;

    async function handleCreate(values: TaskFormValues) {
        const created = await createTask(toTaskInput(values));
        setTasks((current) => [created, ...current]);
        setIsCreateOpen(false);
    }

    async function handleEdit(values: TaskFormValues) {
        if (!editingTask) return;

        const updated = await updateTask(editingTask.id, toTaskInput(values));
        setTasks((current) =>
            current.map((task) => (task.id === updated.id ? updated : task)),
        );
        setEditingTask(null);
    }

    async function handleDelete() {
        if (!deletingTask) return;

        await deleteTask(deletingTask.id);
        setTasks((current) => current.filter((task) => task.id !== deletingTask.id));
        setDeletingTask(null);
    }

    async function handleToggleComplete(task: Task) {
        const updated = await toggleTaskStatus(task.id);
        setTasks((current) =>
            current.map((item) => (item.id === updated.id ? updated : item)),
        );
    }

    async function handleAssignTime(taskId: string, time: string | null) {
        const current = tasks.find((task) => task.id === taskId);
        if (!current || current.time === time) return;

        const updated = await updateTask(taskId, { time });
        setTasks(items => items.map(item => (item.id === updated.id ? updated : item)));
    }

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

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
                    onEdit={setEditingTask}
                    onDelete={setDeletingTask}
                    onToggleComplete={handleToggleComplete}
                    onAssignTime={handleAssignTime}
                />
            ) : (
                <TasksList
                    tasks={filteredTasks}
                    onEdit={setEditingTask}
                    onDelete={setDeletingTask}
                    onToggleComplete={handleToggleComplete}
                />
            )}

            <CreateTaskModal
                open={isCreateOpen}
                defaultDate={toDateKey(selectedDate)}
                onClose={() => setIsCreateOpen(false)}
                onCreate={handleCreate}
            />

            <EditTaskModal
                open={Boolean(editingTask)}
                task={editingTask}
                onClose={() => setEditingTask(null)}
                onSave={handleEdit}
            />

            <DeleteTaskModal
                open={Boolean(deletingTask)}
                task={deletingTask}
                onClose={() => setDeletingTask(null)}
                onConfirm={handleDelete}
            />
        </div>
    );
}
