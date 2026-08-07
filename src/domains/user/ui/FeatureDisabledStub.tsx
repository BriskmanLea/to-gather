"use client";

import { ButtonLink } from "@/shared/ui";
import { getFeatureById, type AppFeatureId } from "../model";

type FeatureDisabledStubProps = {
    featureId: AppFeatureId;
};

export function FeatureDisabledStub({ featureId }: FeatureDisabledStubProps) {
    const feature = getFeatureById(featureId);
    const label = feature?.label ?? "This feature";

    return (
        <div className="mx-auto flex max-w-lg flex-col items-start gap-4 rounded-2xl border border-primary-200 bg-white p-6 shadow-sm sm:p-8">
            <h1 className="text-2xl font-bold tracking-tight text-grey-800">
                {label} is disabled
            </h1>
            <p className="text-grey-500">
                Enable this feature in Settings to view it.
            </p>
            <ButtonLink href="/settings">Open Settings</ButtonLink>
        </div>
    );
}
