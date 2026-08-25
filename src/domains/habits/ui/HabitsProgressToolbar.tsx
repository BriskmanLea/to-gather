"use client";

import { useTranslations } from "next-intl";
import { HABIT_PERIODS, type Habit, type HabitsPeriod } from "../model";
import { HabitsPeriodNavigator } from "./HabitsPeriodNavigator";

type HabitsProgressToolbarProps = {
    period: HabitsPeriod;
    anchor: Date;
    selectedHabitId: string;
    habits: Habit[];
    onPeriodChange: (period: HabitsPeriod) => void;
    onAnchorChange: (date: Date) => void;
    onSelectedHabitChange: (habitId: string) => void;
};

export function HabitsProgressToolbar({
    period,
    anchor,
    selectedHabitId,
    habits,
    onPeriodChange,
    onAnchorChange,
    onSelectedHabitChange
}: HabitsProgressToolbarProps) {
    const t = useTranslations("Habits");

    return (
        <div className="flex min-w-0 flex-col gap-4">
            <div
                role="group"
                aria-label={t("heatmapHabitLabel")}
                className="flex gap-2 overflow-x-auto -mx-1 px-1 pb-1 [scrollbar-width:thin]"
            >
                <button
                    type="button"
                    onClick={() => onSelectedHabitChange("all")}
                    className={[
                        "shrink-0 cursor-pointer rounded-full border px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                        selectedHabitId === "all" ? "border-secondary-500 bg-secondary-100 text-secondary-800" : "border-primary-200 bg-white text-grey-600 hover:border-secondary-500",
                    ].join(" ")}
                >
                    {t("allHabits")}
                </button>

                {habits.map(habit => {
                    const active = selectedHabitId === habit.id;

                    return (
                        <button
                            key={habit.id}
                            type="button"
                            onClick={() => onSelectedHabitChange(habit.id)}
                            className={[
                                "inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                                active ? "border-secondary-500 bg-secondary-100 text-secondary-800" : "border-primary-200 bg-white text-grey-600 hover:border-secondary-500",
                            ].join(" ")}
                        >
                            <span
                                aria-hidden="true"
                                className="size-2 shrink-0 rounded-full"
                                style={{ backgroundColor: habit.color }}
                            />
                            {habit.title}
                        </button>
                    );
                })}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div
                    role="group"
                    aria-label={t("periodAriaLabel")}
                    className="inline-flex self-start rounded-xl border border-primary-200 bg-white p-1"
                >
                    {HABIT_PERIODS.map(item => (
                        <button
                            key={item.value}
                            type="button"
                            onClick={() => onPeriodChange(item.value)}
                            className={[
                                "cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                                period === item.value ? "bg-secondary-100 text-secondary-800" : "text-grey-500 hover:text-grey-800",
                            ].join(" ")}
                        >
                            {t(item.value === "week" ? "periodWeek" : item.value === "month" ? "periodMonth" : "periodYear")}
                        </button>
                    ))}
                </div>

                <div className="w-full sm:max-w-xs sm:flex-1">
                    <HabitsPeriodNavigator
                        period={period}
                        anchor={anchor}
                        onAnchorChange={onAnchorChange}
                    />
                </div>
            </div>
        </div>
    );
}