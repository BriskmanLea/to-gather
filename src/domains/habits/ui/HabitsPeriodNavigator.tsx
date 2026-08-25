"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { endOfWeek, startOfWeek } from "@/shared/lib";
import { isPeriodAtPresent, shiftPeriodAnchor } from "../lib/period";
import type { HabitsPeriod } from "../model";

type HabitsPeriodNavigatorProps = {
    period: HabitsPeriod;
    anchor: Date;
    onAnchorChange: (date: Date) => void;
};

function formatWeekLabel(locale: string, anchor: Date): string {
    const from = startOfWeek(anchor);
    const to = endOfWeek(anchor);
    const fmt = new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" });
    return `${fmt.format(from)} – ${fmt.format(to)}`;
}

function formatMonthLabel(locale: string, anchor: Date): string {
    return new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
    }).format(anchor);
}

function formatYearLabel(anchor: Date): string {
    return String(anchor.getFullYear());
}

export function HabitsPeriodNavigator({ period, anchor, onAnchorChange }: HabitsPeriodNavigatorProps) {
    const t = useTranslations("Habits");
    const locale = useLocale();
    const atPresent = isPeriodAtPresent(period, anchor);

    const label = useMemo(() => {
        if (period === "week") {
            return formatWeekLabel(locale, anchor);
        }

        if (period === "month") {
            return formatMonthLabel(locale, anchor);
        }

        return formatYearLabel(anchor);
    }, [period, anchor, locale]);

    return (
        <div
            role="group"
            aria-label={t("periodNavAriaLabel")}
            className="flex items-center justify-between gap-3 rounded-xl border border-primary-200 bg-white px-2 py-1.5 sm:px-3"
        >
            <button
                type="button"
                aria-label={t("periodNavPrev")}
                onClick={() => onAnchorChange(shiftPeriodAnchor(period, anchor, -1))}
                className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-lg text-grey-600 transition-colors hover:bg-primary-100 hover:text-grey-800"
            >
                ‹
            </button>

            <p className="min-w-0 flex-1 text-center text-sm font-semibold capitalize text-grey-800">
                {label}
            </p>

            <button
                type="button"
                aria-label={t("periodNavNext")}
                disabled={atPresent}
                onClick={() => {
                    if (atPresent) return;
                    onAnchorChange(shiftPeriodAnchor(period, anchor, 1));
                }}
                className={[
                    "flex size-9 shrink-0 items-center justify-center rounded-lg text-lg transition-colors",
                    atPresent ? "cursor-not-allowed text-grey-200" : "cursor-pointer text-grey-600 hover:bg-primary-100 hover:text-grey-800",
                ].join(" ")}
            >
                ›
            </button>
        </div>
    );
}