export type AppFeatureId =
    | "tasks";
    // | "today"
    // | "habits"
    // | "goals"
    // | "notes"
    // | "finance";

export type AppFeature = {
    id: AppFeatureId;
    label: string;
    href: string;
    description: string;
};

export const APP_FEATURES: AppFeature[] = [
    // {
    //     id: "today",
    //     label: "Today",
    //     href: "/today",
    //     description: "Daily planner for what's on your plate right now.",
    // },
    {
        id: "tasks",
        label: "Tasks",
        href: "/tasks",
        description: "To-do lists and schedules for your work and life.",
    },
    // {
    //     id: "habits",
    //     label: "Habits",
    //     href: "/habits",
    //     description: "Track routines and build consistency over time.",
    // },
    // {
    //     id: "goals",
    //     label: "Goals",
    //     href: "/goals",
    //     description: "Set and follow progress on longer-term goals.",
    // },
    // {
    //     id: "notes",
    //     label: "Notes",
    //     href: "/notes",
    //     description: "Capture ideas, journals, and reference notes.",
    // },
    // {
    //     id: "finance",
    //     label: "Finance",
    //     href: "/finance",
    //     description: "Track expenses and personal finances.",
    // },
];

export const DEFAULT_FEATURES: Record<AppFeatureId, boolean> = {
    // today: true,
    tasks: true,
    // habits: true,
    // goals: true,
    // notes: true,
    // finance: true,
};

export function getFeatureByHref(href: string): AppFeature | undefined {
    return APP_FEATURES.find(feature => feature.href === href);
}

export function getFeatureById(id: AppFeatureId): AppFeature | undefined {
    return APP_FEATURES.find(feature => feature.id === id);
}
