"use client";

import type { Habit, HabitFormValues } from "../model";
import { ArchiveHabitModal } from "./ArchiveHabitModal";
import { CreateHabitModal } from "./CreateHabitModal";
import { DeleteHabitModal } from "./DeleteHabitModal";
import { EditHabitModal } from "./EditHabitModal";

type HabitModalsProps = {
    isCreateOpen: boolean;
    editingHabit: Habit | null;
    archivingHabit: Habit | null;
    deletingHabit: Habit | null;
    onCloseCreate: () => void;
    onCloseEdit: () => void;
    onCloseArchive: () => void;
    onCloseDelete: () => void;
    onCreate: (values: HabitFormValues) => Promise<void> | void;
    onSave: (values: HabitFormValues) => Promise<void> | void;
    onConfirmArchive: () => Promise<void> | void;
    onConfirmDelete: () => Promise<void> | void;
};

export function HabitModals({
    isCreateOpen,
    editingHabit,
    archivingHabit,
    deletingHabit,
    onCloseCreate,
    onCloseEdit,
    onCloseArchive,
    onCloseDelete,
    onCreate,
    onSave,
    onConfirmArchive,
    onConfirmDelete
}: HabitModalsProps) {
    return (
        <>
            <CreateHabitModal
                open={isCreateOpen}
                onClose={onCloseCreate}
                onCreate={onCreate}
            />

            <EditHabitModal
                open={Boolean(editingHabit)}
                habit={editingHabit}
                onClose={onCloseEdit}
                onSave={onSave}
            />

            <ArchiveHabitModal
                open={Boolean(archivingHabit)}
                habit={archivingHabit}
                onClose={onCloseArchive}
                onConfirm={onConfirmArchive}
            />

            <DeleteHabitModal
                open={Boolean(deletingHabit)}
                habit={deletingHabit}
                onClose={onCloseDelete}
                onConfirm={onConfirmDelete}
            />
        </>
    );
}