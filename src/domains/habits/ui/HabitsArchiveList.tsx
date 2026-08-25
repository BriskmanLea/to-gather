"use client";

import { useTranslations } from "next-intl";
import type { Habit } from "../model";
import { HabitsArchiveItem } from "./HabitsArchiveItem";

type HabitsArchiveListProps = {
    habits: Habit[];
    onRestore: (habit: Habit) => void;
    onDelete: (habit: Habit) => void;
};

export function HabitsArchiveList({ habits, onRestore, onDelete }: HabitsArchiveListProps) {
    const t = useTranslations("Habits");

    if (habits.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-neutral-400 p-8 text-center">
                <h2 className="text-lg font-semibold text-grey-800">{t("archiveEmptyTitle")}</h2>
                <p className="mt-1 text-sm text-grey-500">{t("archiveEmptyDescription")}</p>
            </div>
        );
    }

    return (
        <section aria-labelledby="habits-archive-heading" className="grid gap-3">
            <div>
                <h2 id="habits-archive-heading" className="text-lg font-semibold text-grey-800">
                    {t("archiveTitle")}
                </h2>
                <p className="mt-0.5 text-sm text-grey-500">{t("archiveSubtitle")}</p>
            </div>

            <ul className="grid gap-3">
                {habits.map(habit => (
                    <li key={habit.id}>
                        <HabitsArchiveItem
                            habit={habit}
                            onRestore={onRestore}
                            onDelete={onDelete}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}