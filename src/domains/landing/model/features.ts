export type LandingFeature = {
    title: string;
    description: string;
    label: string;
};

export const landingFeatures: LandingFeature[] = [
    {
        title: "Daily planner",
        description: "Organize daily tasks, priorities and important activities in one place.",
        label: "Productivity",
    },
    {
        title: "Notes",
        description: "Save ideas, organize them with tags and quickly find what you need.",
        label: "Knowledge",
    },
    {
        title: "Goals",
        description: "Create monthly and yearly goals and monitor progress over time.",
        label: "Growth",
    },
    {
        title: "Habit tracker",
        description: "Build useful routines and understand how consistently you follow them.",
        label: "Consistency",
    },
    {
        title: "Life balance",
        description: "Review important areas of your life and identify what needs attention.",
        label: "Reflection",
    },
    {
        title: "Finance tracker",
        description: "Monitor personal expenses, income and progress toward financial goals.",
        label: "Finance"
    }
];