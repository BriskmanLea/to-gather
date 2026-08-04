import type { Task } from "@/entities/task";

const HOUR_COUNT = 24;

export const SCHEDULE_HOURS = Array.from({ length: HOUR_COUNT }, (_, hour) => hour);

export function formatScheduleHour(hour: number): string {
    return `${String(hour).padStart(2, "0")}:00`;
}

function parseHour(time: string): number {
    const hour = Number.parseInt(time.slice(0, 2), 10);
    if (Number.isNaN(hour) || hour < 0 || hour > 23) {
        return 0;
    }
    return hour;
}

function compareByTime(a: Task, b: Task): number {
    return (a.time ?? "").localeCompare(b.time ?? "");
}

export function splitDayTasks(tasks: Task[]) {
    const untimed: Task[] = [];
    const byHour: Task[][] = Array.from({ length: HOUR_COUNT }, () => []);

    for (const task of tasks) {
        if (!task.time) {
            untimed.push(task);
            continue;
        }

        byHour[parseHour(task.time)].push(task);
    }

    for (const hourTasks of byHour) {
        hourTasks.sort(compareByTime);
    }

    return { untimed, byHour };
}
