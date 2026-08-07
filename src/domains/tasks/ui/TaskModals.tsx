"use client";

import type { Task, TaskFormValues } from "../model";
import { CreateTaskModal } from "./CreateTaskModal";
import { DeleteTaskModal } from "./DeleteTaskModal";
import { EditTaskModal } from "./EditTaskModal";

type TaskModalsProps = {
    editingTask: Task | null;
    deletingTask: Task | null;
    onCloseEdit: () => void;
    onCloseDelete: () => void;
    onSave: (values: TaskFormValues) => Promise<void> | void;
    onConfirmDelete: () => Promise<void> | void;
    isCreateOpen?: boolean;
    createDefaultDate?: string;
    onCloseCreate?: () => void;
    onCreate?: (values: TaskFormValues) => Promise<void> | void;
};

export function TaskModals({
    editingTask,
    deletingTask,
    onCloseEdit,
    onCloseDelete,
    onSave,
    onConfirmDelete,
    isCreateOpen = false,
    createDefaultDate,
    onCloseCreate,
    onCreate,
}: TaskModalsProps) {
    return (
        <>
            {onCreate && onCloseCreate && createDefaultDate ? (
                <CreateTaskModal
                    open={isCreateOpen}
                    defaultDate={createDefaultDate}
                    onClose={onCloseCreate}
                    onCreate={onCreate}
                />
            ) : null}

            <EditTaskModal
                open={Boolean(editingTask)}
                task={editingTask}
                onClose={onCloseEdit}
                onSave={onSave}
            />

            <DeleteTaskModal
                open={Boolean(deletingTask)}
                task={deletingTask}
                onClose={onCloseDelete}
                onConfirm={onConfirmDelete}
            />
        </>
    );
}