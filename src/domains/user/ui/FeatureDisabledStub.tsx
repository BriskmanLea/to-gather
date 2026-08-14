"use client";

import { useTranslations } from "next-intl";
import { ButtonLink } from "@/shared/ui";
import { getFeatureById, type AppFeatureId } from "../model";

const FEATURE_LABEL_KEY: Partial<Record<AppFeatureId, "tasksLabel">> = {
    tasks: "tasksLabel",
};

type FeatureDisabledStubProps = {
    featureId: AppFeatureId;
};

export function FeatureDisabledStub({ featureId }: FeatureDisabledStubProps) {
    const t = useTranslations("Features");
    const feature = getFeatureById(featureId);
    const labelKey = FEATURE_LABEL_KEY[featureId];
    const label = labelKey ? t(labelKey) : feature?.label ?? t("fallbackLabel");

    return (
        <div className="mx-auto flex max-w-lg flex-col items-start gap-4 rounded-2xl border border-primary-200 bg-white p-6 shadow-sm sm:p-8">
            <h1 className="text-2xl font-bold tracking-tight text-grey-800">
                {t("disabledTitle", { label })}
            </h1>
            <p className="text-grey-500">
                {t("disabledDescription")}
            </p>
            <ButtonLink href="/settings">{t("openSettings")}</ButtonLink>
        </div>
    );
}
