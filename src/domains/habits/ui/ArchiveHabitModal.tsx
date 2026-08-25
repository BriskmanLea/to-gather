"use client";

import { useTranslations } from "next-intl";
import { Button, Modal } from "@/shared/ui";
import type { Habit } from "../model";

type ArchiveHabitModalProps = {
    open: boolean;
    habit: Habit | null;
    onClose: () => void;
    onConfirm: () => Promise<void> | void;
};

export function ArchiveHabitModal({ open, habit, onClose, onConfirm }: ArchiveHabitModalProps) {
    const t = useTranslations("Habits");
    const tCommon = useTranslations("Common");

    if (!habit) {
        return null;
    }

    return (
        <Modal
            open={open}
            title={t("archiveModalTitle")}
            onClose={onClose}
            footer={
                <>
                    <Button type="button" variant="secondary" onClick={onClose}>
                        {tCommon("cancel")}
                    </Button>
                    <Button type="button" onClick={onConfirm}>
                        {t("archiveConfirmAction")}
                    </Button>
                </>
            }
        >
            <p className="text-center text-grey-500">
                {t("archiveConfirm", { title: habit.title })}
            </p>
        </Modal>
    );
}