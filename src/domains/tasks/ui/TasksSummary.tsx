"use client";

import { useTranslations } from "next-intl";

type Props = {
    total: number;
    todo: number;
    completed: number;
};

export function TasksSummary({ total, todo, completed }: Props) {
    const t = useTranslations("Tasks");

    return (
        <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full bg-primary-200/50 text-sm font-medium text-primary-800">
                {t("summaryTasks", { total })}
            </span>

            <span className="px-4 py-2 rounded-full bg-warning/15 text-sm font-medium text-warning">
                {t("summaryTodo", { todo })}
            </span>

            <span className="px-4 py-2 rounded-full bg-success/15 text-sm font-medium text-success">
                {t("summaryCompleted", { completed })}
            </span>
        </div>
    );
}
