"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui";

type TasksHeaderProps = {
    onCreateClick: () => void;
};

export function TasksHeader({ onCreateClick }: TasksHeaderProps) {
    const t = useTranslations("Tasks");

    return (
        <div className="flex justify-between items-start gap-4">
            <div>
                <h1 className="m-0 text-4xl font-bold tracking-tight text-grey-800">
                    {t("title")}
                </h1>

                <p className="max-w-2xl text-sm md:text-base leading-snug text-grey-500">
                    {t("subtitle")}
                </p>
            </div>

            <Button className="whitespace-nowrap" onClick={onCreateClick}>
                {t("newTask")}
            </Button>
        </div>
    );
}
