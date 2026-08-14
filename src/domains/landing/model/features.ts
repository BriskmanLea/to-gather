export type LandingFeatureId =
    | "dailyPlanner"
    | "notes"
    | "goals"
    | "habitTracker"
    | "lifeBalance"
    | "financeTracker";

export type LandingFeature = {
    id: LandingFeatureId;
};

export const landingFeatures: LandingFeature[] = [
    { id: "dailyPlanner" },
    { id: "notes" },
    { id: "goals" },
    { id: "habitTracker" },
    { id: "lifeBalance" },
    { id: "financeTracker" },
];
