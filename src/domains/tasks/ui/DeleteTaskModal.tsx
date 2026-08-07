"use client";

import { Button, Modal } from "@/shared/ui";
import type { Task } from "../model";

type DeleteTaskModalProps = {
    open: boolean;
    task: Task | null;
    onClose: () => void;
    onConfirm: () => Promise<void> | void;
};

export function DeleteTaskModal({ open, task, onClose, onConfirm }: DeleteTaskModalProps) {
    if (!task) {
        return null;
    }

    return (
        <Modal
            open={open}
            title="Delete task"
            onClose={onClose}
            footer={
                <>
                    <Button type="button" variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        className="bg-error text-white hover:bg-error/90 hover:text-white"
                        onClick={onConfirm}
                    >
                        Delete
                    </Button>
                </>
            }
        >
            <p className="text-grey-500 text-center">
                Delete <span className="font-medium text-grey-800">{task.title}</span>? This
                cannot be undone.
            </p>
        </Modal>
    );
}