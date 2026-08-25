"use client";

import type { KeyboardEvent } from "react";
import { useTranslations } from "next-intl";
import { IconMenu } from "@/shared/ui";
import type { Habit } from "../model";

type HabitItemProps = {
    habit: Habit;
    completed: boolean;
    onToggle: (habit: Habit) => void;
    onEdit: (habit: Habit) => void;
    onArchive: (habit: Habit) => void;
    onDelete: (habit: Habit) => void;
};

export function HabitItem({
    habit,
    completed,
    onToggle,
    onEdit,
    onArchive,
    onDelete
}: HabitItemProps) {
    const t = useTranslations("Habits");
    const tCommon = useTranslations("Common");

    function handleCardKeyDown(event: KeyboardEvent<HTMLElement>) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onToggle(habit);
        }
    }

    return (
        <article
            role="button"
            tabIndex={0}
            aria-label={
                completed ? t("markIncompleteWithTitle", { title: habit.title }) : t("markCompleteWithTitle", { title: habit.title })
            }
            onClick={() => onToggle(habit)}
            onKeyDown={handleCardKeyDown}
            className={[
                "cursor-pointer rounded-2xl border p-3 shadow-sm transition-all hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500 md:p-4",
                completed ? "border-neutral-400 bg-neutral-100 opacity-80" : "border-primary-200 bg-white hover:border-primary-500",
            ].join(" ")}
        >
            <div className="flex items-center gap-3 md:gap-4">
                <button
                    type="button"
                    onClick={event => {
                        event.stopPropagation();
                        onToggle(habit);
                    }}
                    aria-label={completed ? t("markIncomplete") : t("markComplete")}
                    aria-pressed={completed}
                    className={[
                        "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border text-xs transition-colors cursor-pointer",
                        completed ? "border-secondary-500 bg-secondary-500 text-white" : "border-neutral-400 bg-white hover:border-secondary-500",
                    ].join(" ")}
                >
                    {completed ? "✓" : ""}
                </button>

                <span
                    aria-hidden="true"
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: habit.color }}
                />

                <div className="min-w-0 flex-1">
                    <p
                        className={[
                            "font-medium text-grey-800",
                            completed ? "line-through text-grey-500" : "",
                        ].join(" ")}
                    >
                        {habit.title}
                    </p>
                    {habit.description ? (
                        <p className="mt-0.5 truncate text-sm text-grey-500">
                            {habit.description}
                        </p>
                    ) : null}
                </div>

                <div onClick={event => event.stopPropagation()} onKeyDown={event => event.stopPropagation()}>
                    <IconMenu
                        label={t("actionsFor", { title: habit.title })}
                        items={[
                            {
                                label: tCommon("edit"),
                                onSelect: () => onEdit(habit),
                            },
                            {
                                label: t("archiveAction"),
                                onSelect: () => onArchive(habit),
                            },
                            {
                                label: tCommon("delete"),
                                onSelect: () => onDelete(habit),
                                danger: true,
                            },
                        ]}
                    />
                </div>
            </div>
        </article>
    );
}