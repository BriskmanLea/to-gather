"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCurrentUserStore, type AppFeatureId } from "@/domains/user";

const quickActions: {
    labelKey: "addTask";
    href: string;
    featureId: AppFeatureId;
}[] = [
        {
            labelKey: "addTask",
            href: "/tasks/new",
            featureId: "tasks",
        },
        // {
        //     label: "Create note",
        //     href: "/notes/new",
        //     featureId: "notes",
        // },
        // {
        //     label: "Track habit",
        //     href: "/habits/new",
        //     featureId: "habits",
        // },
        // {
        //     label: "Add expense",
        //     href: "/finance/new",
        //     featureId: "finance",
        // },
    ];

export function QuickActionsCard() {
    const t = useTranslations("Home");
    const features = useCurrentUserStore(state => state.features);
    const visibleActions = quickActions.filter(action => features[action.featureId]);

    if (visibleActions.length === 0) {
        return null;
    }

    return (
        <article className="p-6 rounded-3xl border border-secondary-200 bg-secondary-100 shadow-sm shadow-neutral-700/5">
            <h2 className="text-xl font-semibold text-grey-800">
                {t("quickActionsTitle")}
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {visibleActions.map((action) => (
                    <Link
                        key={action.href}
                        href={action.href}
                        className="px-4 py-3 rounded-2xl border border-secondary-200 bg-white/70  font-medium text-grey-800 transition-colors hover:border-secondary-500 hover:bg-white"
                    >
                        <span
                            aria-hidden="true"
                            className="mr-2 text-secondary-700"
                        >
                            +
                        </span>

                        {t(action.labelKey)}
                    </Link>
                ))}
            </div>
        </article>
    );
}
