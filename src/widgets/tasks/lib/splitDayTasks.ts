import type { Task } from "@/entities/task";

const HOUR_COUNT = 24;

function normalizeStartHour(startHour: number): number {
    return Number.isInteger(startHour) && startHour >= 0 && startHour < HOUR_COUNT ? startHour : 0;
}

export function getScheduleHours(startHour: number): number[] {
    const normalizedStartHour = normalizeStartHour(startHour);

    return Array.from({ length: HOUR_COUNT - normalizedStartHour }, (_, index) => normalizedStartHour + index);
}

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

export function splitDayTasks(tasks: Task[], startHour = 0) {
    const normalizedStartHour = normalizeStartHour(startHour);
    const untimed: Task[] = [];
    const beforeDayStart: Task[] = [];
    const byHour: Task[][] = Array.from({ length: HOUR_COUNT }, () => []);

    for (const task of tasks) {
        if (!task.time) {
            untimed.push(task);
            continue;
        }

        const hour = parseHour(task.time);

        if (hour < normalizedStartHour) {
            beforeDayStart.push(task);
            continue;
        }

        byHour[hour].push(task);
    }

    beforeDayStart.sort(compareByTime);

    for (const hourTasks of byHour) {
        hourTasks.sort(compareByTime);
    }

    return { untimed, beforeDayStart, byHour };
}
