import { formatScheduleHour } from "./splitDayTasks";

export const UNTIMED_DROPPABLE_ID = "untimed";

export function hourDroppableId(hour: number): string {
    return `hour-${hour}`;
}

/** Resolve assigned time from a droppable or task id. */
export function resolveDropTime(overId: string, tasks: { id: string; time: string | null }[]): string | null | undefined {
    if (overId === UNTIMED_DROPPABLE_ID) return null;

    if (overId.startsWith("hour-")) {
        const hour = Number.parseInt(overId.slice(5), 10);
        if (Number.isNaN(hour) || hour < 0 || hour > 23) return undefined;
        return formatScheduleHour(hour);
    }

    const task = tasks.find(item => item.id === overId);
    if (!task) return undefined;
    return task.time;
}
