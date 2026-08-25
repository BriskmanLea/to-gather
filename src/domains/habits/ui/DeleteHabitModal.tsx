"use client";

import { useTranslations } from "next-intl";
import { Button, Modal } from "@/shared/ui";
import type { Habit } from "../model";

type DeleteHabitModalProps = {
    open: boolean;
    habit: Habit | null;
    onClose: () => void;
    onConfirm: () => Promise<void> | void;
};

export function DeleteHabitModal({ open, habit, onClose, onConfirm }: DeleteHabitModalProps) {
    const t = useTranslations("Habits");
    const tCommon = useTranslations("Common");

    if (!habit) {
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
            <p className="text-center text-grey-500">
                {t("deleteConfirm", { title: habit.title })}
            </p>
        </Modal>
    );
}