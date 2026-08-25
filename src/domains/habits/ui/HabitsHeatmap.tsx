"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { endOfMonth, parseDateKey, toDateKey } from "@/shared/lib";
import { isCompletedOn } from "../lib/completions";
import { eachDateKey } from "../lib/dates";
import { isDueOn } from "../lib/isDueOn";
import { completionRate, dayCompletionIntensity } from "../lib/rates";
import { DAYS_OF_WEEK, type Habit, type HabitCompletion, type HabitsPeriod } from "../model";

type HabitsHeatmapProps = {
    habits: Habit[];
    completions: HabitCompletion[];
    period: HabitsPeriod;
    from: string;
    to: string;
    selectedHabitId: string;
    onToggleDay: (habitId: string, dateKey: string) => void;
};

type DayCellModel = {
    dateKey: string | null;
    inRange: boolean;
    due: boolean;
    completed: boolean;
    ratio: number;
    dayNumber: number | null;
};

const MONTH_SHORT_KEYS = [
    "monthShort0",
    "monthShort1",
    "monthShort2",
    "monthShort3",
    "monthShort4",
    "monthShort5",
    "monthShort6",
    "monthShort7",
    "monthShort8",
    "monthShort9",
    "monthShort10",
    "monthShort11",
] as const;

function buildWeekdayOrder() {
    return [...DAYS_OF_WEEK.slice(1), DAYS_OF_WEEK[0]];
}

function intensityClass(ratio: number): string {
    if (ratio <= 0) return "bg-grey-200";
    if (ratio < 0.34) return "bg-secondary-100";
    if (ratio < 0.67) return "bg-secondary-200";
    return "bg-secondary-500";
}

function monthRateForSelection(
    habits: Habit[],
    completions: HabitCompletion[],
    selectedHabit: Habit | null,
    from: string,
    to: string
): number {
    if (selectedHabit) {
        return completionRate(selectedHabit, completions, from, to).rate;
    }

    if (habits.length === 0) {
        return 0;
    }

    const total = habits.reduce(
        (sum, habit) => sum + completionRate(habit, completions, from, to).rate,
        0
    );
    return Math.round(total / habits.length);
}

export function HabitsHeatmap({
    habits,
    completions,
    period,
    from,
    to,
    selectedHabitId,
    onToggleDay
}: HabitsHeatmapProps) {
    const t = useTranslations("Habits");
    const selectedHabit =
        selectedHabitId === "all" ? null : habits.find(habit => habit.id === selectedHabitId) ?? null;
    const weekdays = buildWeekdayOrder();
    const today = toDateKey(new Date());

    function describe(dateKey: string | null, inRange: boolean): DayCellModel {
        if (!dateKey) {
            return {
                dateKey: null,
                inRange: false,
                due: false,
                completed: false,
                ratio: 0,
                dayNumber: null,
            };
        }

        const due = selectedHabit ? isDueOn(selectedHabit, dateKey) : dayCompletionIntensity(habits, completions, dateKey).due > 0;
        const completed = selectedHabit ? isCompletedOn(completions, selectedHabit.id, dateKey) : false;
        const ratio = selectedHabit ? completed ? 1 : 0 : dayCompletionIntensity(habits, completions, dateKey).ratio;

        return {
            dateKey,
            inRange,
            due,
            completed,
            ratio,
            dayNumber: parseDateKey(dateKey).getDate(),
        };
    }

    const calendarWeeks = useMemo(() => {
        const start = parseDateKey(from);
        const padStart = start.getDay() === 0 ? 6 : start.getDay() - 1;
        const keys = eachDateKey(from, to);
        const padded: (string | null)[] = [
            ...Array.from({ length: padStart }, () => null),
            ...keys,
        ];
        const remainder = padded.length % 7;
        if (remainder !== 0) {
            padded.push(...Array.from({ length: 7 - remainder }, () => null));
        }

        const weeks: (string | null)[][] = [];
        for (let i = 0; i < padded.length; i += 7) {
            weeks.push(padded.slice(i, i + 7));
        }
        return weeks;
    }, [from, to]);

    const yearColumns = useMemo(() => {
        if (period !== "year") return [] as (string | null)[][];

        const keys = eachDateKey(from, to);
        const columns: (string | null)[][] = [];

        for (let i = 0; i < keys.length; i += 7) {
            const column: (string | null)[] = keys.slice(i, i + 7);
            while (column.length < 7) {
                column.push(null);
            }
            columns.push(column);
        }

        return columns;
    }, [period, from, to]);

    const monthLabels = useMemo(() => {
        if (period !== "year") return [];

        const labels: { label: string; columnIndex: number }[] = [];
        let lastMonth = -1;

        yearColumns.forEach((column, columnIndex) => {
            const firstDay = column.find(Boolean);
            if (!firstDay) return;
            const month = parseDateKey(firstDay).getMonth();
            if (month !== lastMonth) {
                labels.push({
                    label: t(MONTH_SHORT_KEYS[month]),
                    columnIndex,
                });
                lastMonth = month;
            }
        });

        return labels;
    }, [period, yearColumns, t]);

    const yearMonths = useMemo(() => {
        if (period !== "year") return [];

        // Heatmap `from` is week-padded and may start in the previous December.
        const ref = parseDateKey(from);
        ref.setDate(ref.getDate() + 7);
        const year = ref.getFullYear();
        const todayKey = toDateKey(new Date());
        const months: { key: string; label: string; from: string; to: string; rate: number }[] =
            [];

        for (let month = 0; month < 12; month += 1) {
            const monthStart = new Date(year, month, 1);
            const monthFrom = toDateKey(monthStart);
            const monthTo = toDateKey(endOfMonth(monthStart));

            if (monthFrom > todayKey) {
                break;
            }

            const rangeTo = monthTo > todayKey ? todayKey : monthTo;
            const rate = monthRateForSelection(
                habits,
                completions,
                selectedHabit,
                monthFrom,
                rangeTo
            );

            months.push({
                key: monthFrom,
                label: t(MONTH_SHORT_KEYS[month]),
                from: monthFrom,
                to: rangeTo,
                rate,
            });
        }

        return months;
    }, [period, from, habits, completions, selectedHabit, t]);

    function cellLabel(day: DayCellModel) {
        if (!day.dateKey) return "";

        if (selectedHabit) {
            return day.completed ? t("heatmapCellCompleted", { title: selectedHabit.title, date: day.dateKey }) : t("heatmapCellEmpty", { title: selectedHabit.title, date: day.dateKey });
        }

        return t("heatmapCellAll", { date: day.dateKey });
    }

    function handleToggle(day: DayCellModel) {
        if (!selectedHabit || !day.dateKey || !day.due || !day.inRange) return;
        onToggleDay(selectedHabit.id, day.dateKey);
    }

    function calendarCellClass(day: DayCellModel) {
        const isToday = day.dateKey === today;

        if (!day.dateKey || !day.inRange) {
            return "bg-transparent";
        }

        if (!day.due) {
            return [
                "bg-neutral-100 text-grey-400 ring-1 ring-inset ring-neutral-400",
                isToday ? "ring-2 ring-grey-800/30" : "",
            ].join(" ");
        }

        if (selectedHabit && day.completed) {
            return ["text-white", isToday ? "ring-2 ring-grey-800/40" : ""].join(" ");
        }

        return [
            intensityClass(day.ratio),
            day.ratio > 0.66 ? "text-white" : "text-grey-800",
            isToday ? "ring-2 ring-grey-800/40" : "",
        ].join(" ");
    }

    function renderYearCell(dateKey: string | null, key: string) {
        const inRange = Boolean(dateKey && dateKey >= from && dateKey <= today);
        const day = describe(dateKey, inRange);
        const canToggle =
            Boolean(selectedHabit) && day.due && day.inRange && Boolean(day.dateKey);

        return (
            <button
                key={key}
                type="button"
                disabled={!canToggle}
                aria-label={cellLabel(day)}
                title={cellLabel(day)}
                onClick={() => handleToggle(day)}
                className={[
                    "aspect-square w-full min-w-0 rounded-[2px]",
                    canToggle ? "cursor-pointer hover:opacity-80" : "cursor-default",
                    !day.dateKey ? "bg-transparent" : !day.inRange ? "bg-grey-200/40" : !day.due ? "bg-neutral-100 ring-1 ring-inset ring-neutral-400" : selectedHabit && day.completed ? "" : intensityClass(day.ratio),
                ].join(" ")}
                style={
                    selectedHabit && day.completed && day.due && day.inRange ? { backgroundColor: selectedHabit.color } : undefined
                }
            />
        );
    }

    return (
        <section aria-labelledby="habits-heatmap-heading" className="flex min-w-0 flex-col gap-3">
            <div>
                <h2 id="habits-heatmap-heading" className="text-lg font-semibold text-grey-800">
                    {t("heatmapTitle")}
                </h2>
                <p className="mt-0.5 text-sm text-grey-500 md:hidden">
                    {period === "year" ? t("heatmapHintYear") : selectedHabit ? t("heatmapHintSelected") : t("heatmapHint")}
                </p>
                <p className="mt-0.5 hidden text-sm text-grey-500 md:block">
                    {selectedHabit ? t("heatmapHintSelected") : t("heatmapHint")}
                </p>
            </div>

            <div className="min-w-0 rounded-2xl border border-primary-200 bg-white p-4 sm:p-5">
                {period === "year" ? (
                    <>
                        {/* Mobile: month rates — no horizontal scroll, tappable overview */}
                        <ul className="grid gap-2 md:hidden">
                            {yearMonths.map(month => (
                                <li
                                    key={month.key}
                                    className="grid grid-cols-[2.5rem_1fr_2.25rem] items-center gap-2"
                                >
                                    <span className="text-xs font-medium text-grey-600">
                                        {month.label}
                                    </span>
                                    <div
                                        className="h-2 overflow-hidden rounded-full bg-grey-200"
                                        role="progressbar"
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-valuenow={month.rate}
                                        aria-label={t("heatmapMonthRate", {
                                            month: month.label,
                                            rate: month.rate,
                                        })}
                                    >
                                        <div
                                            className="h-full rounded-full bg-secondary-500 transition-[width]"
                                            style={{
                                                width: `${month.rate}%`,
                                                backgroundColor: selectedHabit?.color,
                                            }}
                                        />
                                    </div>
                                    <span className="text-right text-xs tabular-nums text-grey-500">
                                        {month.rate}%
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Desktop: full-year day grid scaled to container width */}
                        <div className="hidden min-w-0 md:block">
                            <div
                                className="mb-1 grid gap-[3px]"
                                style={{
                                    gridTemplateColumns: `1.75rem repeat(${yearColumns.length}, minmax(0, 1fr))`,
                                }}
                            >
                                <div />
                                {yearColumns.map((_, columnIndex) => {
                                    const month = monthLabels.find(
                                        item => item.columnIndex === columnIndex
                                    );
                                    return (
                                        <div
                                            key={`month-${columnIndex}`}
                                            className="overflow-hidden text-[10px] leading-none text-grey-500"
                                        >
                                            {month?.label ?? ""}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="grid gap-[3px]">
                                {weekdays.map((weekday, rowIndex) => (
                                    <div
                                        key={weekday.value}
                                        className="grid gap-[3px]"
                                        style={{
                                            gridTemplateColumns: `1.75rem repeat(${yearColumns.length}, minmax(0, 1fr))`,
                                        }}
                                    >
                                        <div className="flex items-center text-[10px] leading-none text-grey-500">
                                            {rowIndex === 0 || rowIndex === 2 || rowIndex === 4 ? t(weekday.labelKey) : ""}
                                        </div>
                                        {yearColumns.map((column, columnIndex) =>
                                            renderYearCell(
                                                column[rowIndex] ?? null,
                                                `${columnIndex}-${rowIndex}`
                                            )
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="mx-auto grid w-full max-w-md gap-1.5">
                        <div className="grid grid-cols-7 gap-1.5">
                            {weekdays.map(weekday => (
                                <div
                                    key={weekday.value}
                                    className="text-center text-[11px] font-medium text-grey-500"
                                >
                                    {t(weekday.labelKey)}
                                </div>
                            ))}
                        </div>

                        <div className="grid gap-1.5">
                            {calendarWeeks.map((week, weekIndex) => (
                                <div key={weekIndex} className="grid grid-cols-7 gap-1.5">
                                    {week.map((dateKey, dayIndex) => {
                                        const inRange = Boolean(
                                            dateKey && dateKey >= from && dateKey <= to
                                        );
                                        const day = describe(dateKey, inRange);
                                        const canToggle =
                                            Boolean(selectedHabit) &&
                                            day.due &&
                                            day.inRange &&
                                            Boolean(day.dateKey);

                                        return (
                                            <button
                                                key={`${weekIndex}-${dayIndex}`}
                                                type="button"
                                                disabled={!canToggle}
                                                aria-label={cellLabel(day)}
                                                title={cellLabel(day)}
                                                onClick={() => handleToggle(day)}
                                                className={[
                                                    "flex h-9 flex-col items-center justify-center rounded-lg border text-xs font-medium transition-opacity sm:h-10",
                                                    !day.dateKey || !day.inRange ? "border-transparent" : "border-primary-100",
                                                    canToggle ? "cursor-pointer hover:opacity-90" : "cursor-default",
                                                    calendarCellClass(day),
                                                ].join(" ")}
                                                style={
                                                    selectedHabit && day.completed && day.due && day.inRange ? { backgroundColor: selectedHabit.color } : undefined
                                                }
                                            >
                                                {day.dayNumber != null && day.inRange ? (
                                                    <span className="leading-none">
                                                        {day.dayNumber}
                                                        {day.due && day.completed ? (
                                                            <span className="ml-0.5 text-[9px]">
                                                                ✓
                                                            </span>
                                                        ) : null}
                                                    </span>
                                                ) : null}
                                            </button>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs text-grey-500">
                    {period === "year" ? (
                        <>
                            <div className="flex items-center gap-1 md:hidden">
                                <span>{t("heatmapLess")}</span>
                                <span className="size-3 rounded-sm bg-grey-200" />
                                <span
                                    className="size-3 rounded-sm bg-secondary-500"
                                    style={
                                        selectedHabit ? { backgroundColor: selectedHabit.color } : undefined
                                    }
                                />
                                <span>{t("heatmapMore")}</span>
                            </div>

                            <div className="hidden flex-wrap items-center gap-3 md:flex">
                                {selectedHabit ? (
                                    <>
                                        <span className="inline-flex items-center gap-1.5">
                                            <span
                                                className="size-3 rounded-sm"
                                                style={{ backgroundColor: selectedHabit.color }}
                                            />
                                            {t("heatmapDone")}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5">
                                            <span className="size-3 rounded-sm bg-grey-200" />
                                            {t("heatmapMissed")}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5">
                                            <span className="size-3 rounded-sm bg-neutral-100 ring-1 ring-inset ring-neutral-400" />
                                            {t("heatmapNotDue")}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-1">
                                            <span>{t("heatmapLess")}</span>
                                            <span className="size-3 rounded-sm bg-grey-200" />
                                            <span className="size-3 rounded-sm bg-secondary-100" />
                                            <span className="size-3 rounded-sm bg-secondary-200" />
                                            <span className="size-3 rounded-sm bg-secondary-500" />
                                            <span>{t("heatmapMore")}</span>
                                        </div>
                                        <span className="text-grey-400">·</span>
                                        <span className="inline-flex items-center gap-1.5">
                                            <span className="size-3 rounded-sm bg-neutral-100 ring-1 ring-inset ring-neutral-400" />
                                            {t("heatmapNotDue")}
                                        </span>
                                    </>
                                )}
                            </div>
                        </>
                    ) : selectedHabit ? (
                        <>
                            <span className="inline-flex items-center gap-1.5">
                                <span
                                    className="size-3 rounded-sm"
                                    style={{ backgroundColor: selectedHabit.color }}
                                />
                                {t("heatmapDone")}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <span className="size-3 rounded-sm bg-grey-200" />
                                {t("heatmapMissed")}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <span className="size-3 rounded-sm bg-neutral-100 ring-1 ring-inset ring-neutral-400" />
                                {t("heatmapNotDue")}
                            </span>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-1">
                                <span>{t("heatmapLess")}</span>
                                <span className="size-3 rounded-sm bg-grey-200" />
                                <span className="size-3 rounded-sm bg-secondary-100" />
                                <span className="size-3 rounded-sm bg-secondary-200" />
                                <span className="size-3 rounded-sm bg-secondary-500" />
                                <span>{t("heatmapMore")}</span>
                            </div>
                            <span className="text-grey-400">·</span>
                            <span className="inline-flex items-center gap-1.5">
                                <span className="size-3 rounded-sm bg-neutral-100 ring-1 ring-inset ring-neutral-400" />
                                {t("heatmapNotDue")}
                            </span>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}