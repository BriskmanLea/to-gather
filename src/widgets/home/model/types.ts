export type OverviewItem = {
    label: string;
    value: string;
    description: string;
};

export type Task = {
    id: string;
    title: string;
    completed: boolean;
    time?: string;
};

export type Habit = {
    id: string;
    title: string;
    completed: boolean;
};

export type Goal = {
    id: string;
    title: string;
    progress: number;
};

export type HomeData = {
    overview: OverviewItem[];
    tasks: Task[];
    habits: Habit[];
    goals: Goal[];
};