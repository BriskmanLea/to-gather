"use client";

import type { PropsWithChildren } from "react";
import { useCurrentUserStore, useFeatureEnabled, type AppFeatureId } from "../model";
import { FeatureDisabledStub } from "./FeatureDisabledStub";

type RequireFeatureProps = PropsWithChildren<{
    featureId: AppFeatureId;
}>;

export function RequireFeature({ featureId, children }: RequireFeatureProps) {
    const hasHydrated = useCurrentUserStore(state => state.hasHydrated);
    const isEnabled = useFeatureEnabled(featureId);

    if (hasHydrated && !isEnabled) {
        return <FeatureDisabledStub featureId={featureId} />;
    }

    return children;
}
