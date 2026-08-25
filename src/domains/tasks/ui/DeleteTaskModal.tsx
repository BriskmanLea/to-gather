"use client";

import { useTranslations } from "next-intl";
import { Button, Modal } from "@/shared/ui";
import type { Task } from "../model";

type DeleteTaskModalProps = {
    open: boolean;
    task: Task | null;
    onClose: () => void;
    onConfirm: () => Promise<void> | void;
};

export function DeleteTaskModal({ open, task, onClose, onConfirm }: DeleteTaskModalProps) {
    const t = useTranslations("Tasks");
    const tCommon = useTranslations("Common");

    if (!task) {
        return null;
    }

    return (
        <Modal
            open={open}
            title={t("deleteModalTitle")}
            onClose={onClose}
            footer={
                <>
                    <Button type="button" variant="secondary" onClick={onClose}>
                        {tCommon("cancel")}
                    </Button>
                    <Button
                        type="button"
                        className="bg-error text-white hover:bg-error/90 hover:text-white"
                        onClick={onConfirm}
                    >
                        {tCommon("delete")}
                    </Button>
                </>
            }
        >
            <p className="text-grey-500 text-center">
                {t("deleteConfirm", { title: task.title })}
            </p>
        </Modal>
    );
}