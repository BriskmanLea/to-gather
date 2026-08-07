"use client";

import Link from "next/link";
import type { Task } from "@/domains/tasks";
import { TaskItem, TaskModals, useTasks } from "@/domains/tasks";

type TasksCardProps = {
    tasks: Task[];
};

export function TasksCard({ tasks: initialTasks }: TasksCardProps) {
    const {
        tasks,
        editingTask,
        deletingTask,
        setEditingTask,
        setDeletingTask,
        edit,
        remove,
        toggleComplete,
        closeEdit,
        closeDelete,
    } = useTasks(initialTasks);

    return (
        <article className="p-6 rounded-3xl border border-neutral-400/50 bg-white shadow-sm shadow-neutral-700/5">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-grey-800">Today's tasks</h2>

                <Link
                    href="/tasks"
                    className="text-sm font-medium text-secondary-700 transition-colors hover:text-secondary-800"
                >
                    View all
                </Link>
            </div>

            {tasks.length > 0 ? (
                <div className="grid gap-3 mt-5">
                    {tasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            compact
                            onEdit={setEditingTask}
                            onDelete={setDeletingTask}
                            onToggleComplete={toggleComplete}
                        />
                    ))}
                </div>
            ) : (
                <div className="mt-5 p-6 rounded-2xl border border-dashed border-neutral-400 text-center">
                    <p className="text-sm text-grey-500">
                        You have no tasks planned for today.
                    </p>
                </div>
            )}

            <TaskModals
                editingTask={editingTask}
                deletingTask={deletingTask}
                onCloseEdit={closeEdit}
                onCloseDelete={closeDelete}
                onSave={edit}
                onConfirmDelete={remove}
            />
        </article>
    );
}
