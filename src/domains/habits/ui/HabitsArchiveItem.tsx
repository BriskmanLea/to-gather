"use client";

import { useTranslations } from "next-intl";
import { IconMenu } from "@/shared/ui";
import type { Habit } from "../model";

type HabitsArchiveItemProps = {
    habit: Habit;
    onRestore: (habit: Habit) => void;
    onDelete: (habit: Habit) => void;
};

export function HabitsArchiveItem({ habit, onRestore, onDelete }: HabitsArchiveItemProps) {
    const t = useTranslations("Habits");
    const tCommon = useTranslations("Common");

    return (
        <article className="flex items-center gap-3 rounded-2xl border border-primary-200 bg-white p-3 shadow-sm md:p-4">
            <span
                aria-hidden="true"
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: habit.color }}
            />

            <div className="min-w-0 flex-1">
                <p className="font-medium text-grey-800">{habit.title}</p>
                {habit.description ? (
                    <p className="mt-0.5 truncate text-sm text-grey-500">{habit.description}</p>
                ) : null}
            </div>

            <IconMenu
                label={t("actionsFor", { title: habit.title })}
                items={[
                    {
                        label: t("restoreAction"),
                        onSelect: () => onRestore(habit),
                    },
                    {
                        label: tCommon("delete"),
                        onSelect: () => onDelete(habit),
                        danger: true,
                    },
                ]}
            />
        </article>
    );
}