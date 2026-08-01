"use client";

import type { Task } from "@/entities/task";
import { Modal } from "@/shared/ui";
import { TaskForm, type TaskFormValues } from "@/features/tasks/create";

type EditTaskModalProps = {
    open: boolean;
    task: Task | null;
    onClose: () => void;
    onSave: (values: TaskFormValues) => Promise<void> | void;
};

export function EditTaskModal({ open, task, onClose, onSave }: EditTaskModalProps) {
    if (!task) {
        return null;
    }

    return (
        <Modal open={open} title="Edit task" onClose={onClose}>
            <TaskForm
                key={task.id}
                defaultValues={{
                    title: task.title,
                    description: task.description ?? "",
                    priority: task.priority ?? "",
                    date: task.date,
                    time: task.time ?? "",
                }}
                submitLabel="Save changes"
                onCancel={onClose}
                onSubmit={onSave}
            />
        </Modal>
    );
}