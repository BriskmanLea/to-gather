export type HabitFrequency =
    | { type: "daily" }
    | { type: "weekly"; daysOfWeek: number[] }
    | { type: "interval"; everyDays: number };

export type Habit = {
    id: string;
    title: string;
    description?: string;
    frequency: HabitFrequency;
    color: string;
    archived: boolean;
    createdAt: string;
};

export type HabitCompletion = {
    id: string;
    habitId: string;
    /** Local calendar date as `YYYY-MM-DD` */
    date: string;
    completedAt: string;
};

export type HabitsPeriod = "week" | "month" | "year";

export type HabitsPageView = "today" | "progress" | "archive";

export type HabitStats = {
    habitId: string;
    currentStreak: number;
    longestStreak: number;
    completionRate: number;
    completedDue: number;
    dueCount: number;
};