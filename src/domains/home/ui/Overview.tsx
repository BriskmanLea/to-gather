"use client";

import { useTranslations } from "next-intl";
import type { OverviewItem } from "../model/types";
import { OverviewCard } from "./OverviewCard";

type OverviewProps = {
    items: OverviewItem[];
};

const OVERVIEW_COPY_BY_LABEL: Record<
    string,
    { label: "tasksLabel" | "focusLabel"; description: "tasksDescription" | "focusDescription" }
> = {
    Tasks: { label: "tasksLabel", description: "tasksDescription" },
    Focus: { label: "focusLabel", description: "focusDescription" },
};

export function Overview({ items }: OverviewProps) {
    const t = useTranslations("Home");

    return (
        <section
            aria-label={t("overviewAriaLabel")}
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mt-8"
        >
            {items.map((item) => {
                const copy = OVERVIEW_COPY_BY_LABEL[item.label];
                const displayItem: OverviewItem = copy
                    ? {
                        ...item,
                        label: t(copy.label),
                        description: t(copy.description),
                    }
                    : item;

                return (
                    <OverviewCard
                        key={item.label}
                        item={displayItem}
                    />
                );
            })}
        </section>
    );
}
