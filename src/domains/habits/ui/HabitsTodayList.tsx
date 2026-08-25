"use client";

import { useTranslations } from "next-intl";
import type { Habit } from "../model";
import { HabitItem } from "./HabitItem";

type HabitsTodayListProps = {
    habits: Habit[];
    completedIds: Set<string>;
    onToggle: (habit: Habit) => void;
    onEdit: (habit: Habit) => void;
    onArchive: (habit: Habit) => void;
    onDelete: (habit: Habit) => void;
};

export function HabitsTodayList({
    habits,
    completedIds,
    onToggle,
    onEdit,
    onArchive,
    onDelete
}: HabitsTodayListProps) {
    const t = useTranslations("Habits");

    if (habits.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-neutral-400 p-8 text-center">
                <h2 className="text-lg font-semibold text-grey-800">{t("emptyTodayTitle")}</h2>
                <p className="mt-1 text-sm text-grey-500">{t("emptyTodayDescription")}</p>
            </div>
        );
    }

    return (
        <section aria-labelledby="habits-today-heading">
            <h2 id="habits-today-heading" className="text-lg font-semibold text-grey-800">
                {t("todayTitle")}
            </h2>
            <ul className="mt-3 grid gap-3">
                {habits.map(habit => (
                    <li key={habit.id}>
                        <HabitItem
                            habit={habit}
                            completed={completedIds.has(habit.id)}
                            onToggle={onToggle}
                            onEdit={onEdit}
                            onArchive={onArchive}
                            onDelete={onDelete}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}