"use client";

import { useState, KeyboardEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { toggleCompletion } from "@/domains/habits";
import { toDateKey } from "@/shared/lib";
import type { Habit } from "../model/types";

type HabitsCardProps = {
    habits: Habit[];
};

export function HabitsCard({ habits: initialHabits }: HabitsCardProps) {
    const t = useTranslations("Home");
    const tHabits = useTranslations("Habits");
    const tCommon = useTranslations("Common");
    const [habits, setHabits] = useState(initialHabits);
    const today = toDateKey(new Date());

    const completedHabits = habits.filter(habit => habit.completed).length;
    const progress =
        habits.length > 0 ? Math.round((completedHabits / habits.length) * 100) : 0;

    async function toggle(habit: Habit) {
        await toggleCompletion(habit.id, today);
        setHabits(current =>
            current.map(item =>
                item.id === habit.id ? { ...item, completed: !item.completed } : item
            )
        );
    }

    function handleItemKeyDown(event: KeyboardEvent<HTMLElement>, habit: Habit) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            void toggle(habit);
        }
    }

    return (
        <article className="rounded-3xl border border-neutral-400/50 bg-white p-6 shadow-sm shadow-neutral-700/5">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-grey-800">
                    {t("habitsCardTitle")}
                </h2>

                <Link
                    href="/habits"
                    className="text-sm font-medium text-secondary-700 transition-colors hover:text-secondary-800"
                >
                    {tCommon("viewAll")}
                </Link>
            </div>

            <div className="mt-5">
                <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-grey-500">
                        {t("habitsProgressToday", { progress })}
                    </p>
                    <p className="text-sm font-medium text-grey-800">
                        {completedHabits}/{habits.length}
                    </p>
                </div>

                <div
                    role="progressbar"
                    aria-label={t("habitsProgressAria")}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={progress}
                    className="mt-2 h-2 overflow-hidden rounded-full bg-secondary-100"
                >
                    <div
                        className="h-full rounded-full bg-secondary-500 transition-[width]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {habits.length > 0 ? (
                <ul className="mt-5 grid gap-2">
                    {habits.map(habit => (
                        <li key={habit.id}>
                            <button
                                type="button"
                                onClick={() => void toggle(habit)}
                                onKeyDown={event => handleItemKeyDown(event, habit)}
                                aria-pressed={habit.completed}
                                aria-label={
                                    habit.completed ? tHabits("markIncompleteWithTitle", { title: habit.title, }) : tHabits("markCompleteWithTitle", { title: habit.title, })
                                }
                                className={[
                                    "flex w-full cursor-pointer items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition-all",
                                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500",
                                    habit.completed ? "border-neutral-400 bg-neutral-100" : "border-primary-200 bg-white hover:border-secondary-500",
                                ].join(" ")}
                            >
                                <span
                                    aria-hidden="true"
                                    className={[
                                        "flex size-5 shrink-0 items-center justify-center rounded-full border text-xs",
                                        habit.completed ? "border-secondary-500 bg-secondary-500 text-white" : "border-neutral-400 bg-white",
                                    ].join(" ")}
                                >
                                    {habit.completed ? "✓" : ""}
                                </span>

                                <span
                                    aria-hidden="true"
                                    className="size-2 shrink-0 rounded-full"
                                    style={{ backgroundColor: habit.color }}
                                />

                                <span
                                    className={[
                                        "min-w-0 flex-1 font-medium",
                                        habit.completed ? "text-grey-500 line-through" : "text-grey-800",
                                    ].join(" ")}
                                >
                                    {habit.title}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="mt-5 rounded-2xl border border-dashed border-neutral-400 p-6 text-center">
                    <p className="text-sm text-grey-500">{t("habitsEmpty")}</p>
                    <Link
                        href="/habits"
                        className="mt-3 inline-block text-sm font-medium text-secondary-700 transition-colors hover:text-secondary-800"
                    >
                        {t("trackHabit")}
                    </Link>
                </div>
            )}
        </article>
    );
}