"use client";

import { useTranslations } from "next-intl";
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
    const t = useTranslations("Tasks");

    return (
        <Modal open={open} title={t("createModalTitle")} onClose={onClose}>
            <TaskForm
                key={open ? defaultDate : "closed"}
                defaultValues={{
                    title: "",
                    description: "",
                    priority: "",
                    date: defaultDate,
                    time: ""
                }}
                submitLabel={t("createSubmit")}
                onCancel={onClose}
                onSubmit={onCreate}
            />
        </Modal>
    );
}
