export const HABIT_COLORS = [
    { value: "#0d9488", label: "Teal" },
    { value: "#2563eb", label: "Blue" },
    { value: "#ca8a04", label: "Gold" },
    { value: "#dc2626", label: "Red" },
    { value: "#7c3aed", label: "Violet" },
    { value: "#059669", label: "Green" },
] as const;

export const HABIT_PERIODS = [
    { value: "week" as const },
    { value: "month" as const },
    { value: "year" as const },
];

export const HABITS_PAGE_VIEWS = [
    { value: "today" as const },
    { value: "progress" as const },
    { value: "archive" as const },
];

export const DAYS_OF_WEEK = [
    { value: 0, labelKey: "daySun" as const },
    { value: 1, labelKey: "dayMon" as const },
    { value: 2, labelKey: "dayTue" as const },
    { value: 3, labelKey: "dayWed" as const },
    { value: 4, labelKey: "dayThu" as const },
    { value: 5, labelKey: "dayFri" as const },
    { value: 6, labelKey: "daySat" as const },
];

export const DEFAULT_HABIT_COLOR = HABIT_COLORS[0].value;