"use client";

import { useTranslations } from "next-intl";
import { Modal } from "@/shared/ui";
import { formValuesFromHabit, Habit, HabitFormValues } from "../model";
import { HabitForm } from "./HabitForm";

type EditHabitModalProps = {
    open: boolean;
    habit: Habit | null;
    onClose: () => void;
    onSave: (values: HabitFormValues) => Promise<void> | void;
};

export function EditHabitModal({ open, habit, onClose, onSave }: EditHabitModalProps) {
    const t = useTranslations("Habits");

    if (!habit) {
        return null;
    }

    return (
        <Modal open={open} title={t("editModalTitle")} onClose={onClose}>
            <HabitForm
                key={habit.id}
                defaultValues={formValuesFromHabit(habit)}
                submitLabel={t("editSubmit")}
                onCancel={onClose}
                onSubmit={onSave}
            />
        </Modal>
    );
}