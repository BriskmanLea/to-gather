"use client";

import { useLocale, useTranslations } from "next-intl";

export function DashboardPreview() {
    const t = useTranslations("Landing.dashboardPreview");
    const locale = useLocale();

    const modules = [
        {
            name: t("moduleTasksName"),
            description: t("moduleTasksDescription"),
            value: "75%",
        },
        {
            name: t("moduleHabitsName"),
            description: t("moduleHabitsDescription"),
            value: "60%",
        },
        {
            name: t("moduleGoalsName"),
            description: t("moduleGoalsDescription"),
            value: "42%",
        },
    ];

    const currentDate = new Date();
    const day = currentDate.toLocaleDateString(locale, { weekday: "long" });
    const month = currentDate.toLocaleDateString(locale, { month: "long" });
    const dayOfMonth = currentDate.getDate();

    return (
        <div className="rounded-3xl border border-neutral-400/60 bg-white/60 p-4 shadow-neutral-700/10">
            <div className="rounded-2xl border border-neutral-400/50 bg-neutral-100 p-4">
                <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-6">
                    <div>
                        <p className="text-sm text-grey-500">
                            {day}, {dayOfMonth} {month}
                        </p>

                        <h2 className="mt-1 text-2xl font-semibold text-grey-800">
                            {t("greeting")}
                        </h2>
                    </div>

                    <span className="rounded-full bg-secondary-100 px-2 py-1 text-sm font-medium text-secondary-800">
                        {t("balanceBadge")}
                    </span>
                </div>

                <div className="grid gap-3">
                    {modules.map((module) => (
                        <article
                            key={module.name}
                            className="rounded-2xl border border-neutral-400/40 bg-white/70 p-4"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-medium text-grey-800">{module.name}</h3>

                                    <p className="mt-1 text-sm text-grey-500">
                                        {module.description}
                                    </p>
                                </div>

                                <span className="text-sm font-semibold text-secondary-700">
                                    {module.value}
                                </span>
                            </div>

                            <div className="h-2 mt-4 overflow-hidden rounded-full bg-secondary-100">
                                <div
                                    className="h-full rounded-full bg-secondary-500"
                                    style={{ width: module.value }}
                                />
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
