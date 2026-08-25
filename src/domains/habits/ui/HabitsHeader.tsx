"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui";

type HabitsHeaderProps = {
    onCreateClick: () => void;
};

export function HabitsHeader({ onCreateClick }: HabitsHeaderProps) {
    const t = useTranslations("Habits");

    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <h1 className="m-0 text-4xl font-bold tracking-tight text-grey-800">
                    {t("title")}
                </h1>
                <p className="max-w-2xl text-sm leading-snug text-grey-500 md:text-base">
                    {t("subtitle")}
                </p>
            </div>

            <Button className="whitespace-nowrap" onClick={onCreateClick}>
                {t("newHabit")}
            </Button>
        </div>
    );
}