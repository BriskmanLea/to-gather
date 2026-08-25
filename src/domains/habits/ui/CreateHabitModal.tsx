"use client";

import { useTranslations } from "next-intl";
import { Modal } from "@/shared/ui";
import { DEFAULT_HABIT_COLOR, HabitFormValues } from "../model";
import { HabitForm } from "./HabitForm";

type CreateHabitModalProps = {
    open: boolean;
    onClose: () => void;
    onCreate: (values: HabitFormValues) => Promise<void> | void;
};

export function CreateHabitModal({ open, onClose, onCreate }: CreateHabitModalProps) {
    const t = useTranslations("Habits");

    return (
        <Modal open={open} title={t("createModalTitle")} onClose={onClose}>
            <HabitForm
                key={open ? "open" : "closed"}
                defaultValues={{
                    title: "",
                    description: "",
                    frequencyType: "daily",
                    daysOfWeek: [],
                    everyDays: 2,
                    color: DEFAULT_HABIT_COLOR,
                }}
                submitLabel={t("createSubmit")}
                onCancel={onClose}
                onSubmit={onCreate}
            />
        </Modal>
    );
}