"use client";

import { useTranslations } from "next-intl";
import { TASK_VIEWS, TasksView } from "../model";

type TasksViewTabsProps = {
    value: TasksView;
    onChange: (value: TasksView) => void;
};

const VIEW_LABEL_KEYS = {
    day: "viewDay",
    week: "viewWeek",
    month: "viewMonth",
} as const;

export function TasksViewTabs({ value, onChange }: TasksViewTabsProps) {
    const t = useTranslations("Tasks");

    return (
        <div className="inline-flex gap-2 w-full rounded-xl bg-primary-100">
            {TASK_VIEWS.map(tab => {
                const active = value === tab.value;

                return (
                    <button
                        key={tab.value}
                        type="button"
                        onClick={() => onChange(tab.value)}
                        className={`w-full md:w-auto rounded-lg px-4 py-2 text-sm font-medium transition-all cursor-pointer ${active ? "bg-secondary-500 text-white shadow-sm" : "bg-secondary-100 text-grey-800 hover:bg-secondary-200"}`}
                    >
                        {t(VIEW_LABEL_KEYS[tab.value])}
                    </button>
                );
            })}
        </div>
    );
}