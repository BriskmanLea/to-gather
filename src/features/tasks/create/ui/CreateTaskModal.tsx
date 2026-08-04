"use client";

import { Modal } from "@/shared/ui";
import type { TaskFormValues } from "../model/task-form-schema";
import { TaskForm } from "./TaskForm";

type CreateTaskModalProps = {
    open: boolean;
    defaultDate: string;
    onClose: () => void;
    onCreate: (values: TaskFormValues) => Promise<void> | void;
};

export function CreateTaskModal({ open, defaultDate, onClose, onCreate }: CreateTaskModalProps) {
    return (
        <Modal open={open} title="New task" onClose={onClose}>
            <TaskForm
                key={open ? defaultDate : "closed"}
                defaultValues={{
                    title: "",
                    description: "",
                    priority: "",
                    date: defaultDate,
                    time: ""
                }}
                submitLabel="Create task"
                onCancel={onClose}
                onSubmit={onCreate}
            />
        </Modal>
    );
}
