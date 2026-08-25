"use client";

import { useTranslations } from "next-intl";

type HabitsSummaryProps = {
    completed: number;
    total: number;
};

export function HabitsSummary({ completed, total }: HabitsSummaryProps) {
    const t = useTranslations("Habits");
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <p className="text-sm text-grey-500">
            {t("summaryToday", { completed, total, progress })}
        </p>
    );
}