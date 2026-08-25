"use client";

import { RequireFeature } from "@/domains/user";
import type { Habit, HabitCompletion } from "../model";
import { HabitsContent } from "./HabitsContent";

type HabitsFeatureGateProps = {
    habits: Habit[];
    completions: HabitCompletion[];
};

export function HabitsFeatureGate({ habits, completions }: HabitsFeatureGateProps) {
    return (
        <RequireFeature featureId="habits">
            <HabitsContent habits={habits} completions={completions} />
        </RequireFeature>
    );
}