"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { getHabitStats } from "../lib/rates";
import type { Habit, HabitCompletion } from "../model";

type HabitsStatsProps = {
    habits: Habit[];
    completions: HabitCompletion[];
    from: string;
    to: string;
};

export function HabitsStats({ habits, completions, from, to }: HabitsStatsProps) {
    const t = useTranslations("Habits");

    const rows = useMemo(
        () =>
            habits.map(habit => ({
                habit,
                stats: getHabitStats(habit, completions, from, to),
            })),
        [habits, completions, from, to]
    );

    if (rows.length === 0) {
        return null;
    }

    return (
        <section aria-labelledby="habits-stats-heading" className="grid gap-3">
            <h2 id="habits-stats-heading" className="text-lg font-semibold text-grey-800">
                {t("statsTitle")}
            </h2>

            <ul className="grid gap-3 sm:grid-cols-2">
                {rows.map(({ habit, stats }) => (
                    <li
                        key={habit.id}
                        className="rounded-2xl border border-primary-200 bg-white p-4 shadow-sm"
                    >
                        <div className="flex items-center gap-2">
                            <span
                                aria-hidden="true"
                                className="size-2.5 rounded-full"
                                style={{ backgroundColor: habit.color }}
                            />
                            <p className="font-medium text-grey-800">{habit.title}</p>
                        </div>

                        <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
                            <div>
                                <dt className="text-xs text-grey-500">{t("statCurrentStreak")}</dt>
                                <dd className="mt-1 text-lg font-semibold text-grey-800">
                                    {stats.currentStreak}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs text-grey-500">{t("statLongestStreak")}</dt>
                                <dd className="mt-1 text-lg font-semibold text-grey-800">
                                    {stats.longestStreak}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs text-grey-500">{t("statRate")}</dt>
                                <dd className="mt-1 text-lg font-semibold text-grey-800">
                                    {stats.completionRate}%
                                </dd>
                            </div>
                        </dl>
                    </li>
                ))}
            </ul>
        </section>
    );
}