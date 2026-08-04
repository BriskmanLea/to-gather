import type { DayDisplayMode, TasksView } from "./types";

export { TASK_PRIORITIES, TASK_STATUSES } from "@/entities/task";

export const TASK_VIEWS: ReadonlyArray<{
    value: TasksView;
    label: string;
}> = [
    {
        value: "day",
        label: "Day",
    },
    {
        value: "week",
        label: "Week",
    },
    {
        value: "month",
        label: "Month",
    },
];

export const DAY_DISPLAY_MODES: ReadonlyArray<{
    value: DayDisplayMode;
    label: string;
}> = [
    {
        value: "list",
        label: "List",
    },
    {
        value: "schedule",
        label: "Schedule",
    },
];
