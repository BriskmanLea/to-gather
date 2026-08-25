"use client";

import { useTranslations } from "next-intl";
import { HABITS_PAGE_VIEWS, HabitsPageView } from "../model";

type HabitsViewTabsProps = {
    value: HabitsPageView;
    onChange: (value: HabitsPageView) => void;
};

const VIEW_LABEL_KEYS = {
    today: "viewToday",
    progress: "viewProgress",
    archive: "viewArchive",
} as const;

export function HabitsViewTabs({ value, onChange }: HabitsViewTabsProps) {
    const t = useTranslations("Habits");

    return (
        <div
            role="tablist"
            aria-label={t("viewsAriaLabel")}
            className="inline-flex w-full gap-2 rounded-xl bg-primary-100"
        >
            {HABITS_PAGE_VIEWS.map(tab => {
                const active = value === tab.value;

                return (
                    <button
                        key={tab.value}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => onChange(tab.value)}
                        className={[
                            "w-full cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-all md:w-auto",
                            active ? "bg-secondary-500 text-white shadow-sm" : "bg-secondary-100 text-grey-800 hover:bg-secondary-200",
                        ].join(" ")}
                    >
                        {t(VIEW_LABEL_KEYS[tab.value])}
                    </button>
                );
            })}
        </div>
    );
}