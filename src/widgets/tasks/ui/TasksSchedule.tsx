"use client";

import { useState } from "react";
import { DndContext, DragOverlay, MouseSensor, TouchSensor, closestCenter, useDraggable, useSensor, useSensors, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import type { Task } from "@/entities/task";
import { TaskItem } from "./TaskItem";
import { ScheduleDropZone } from "./ScheduleDropZone";
import { SCHEDULE_HOURS, formatScheduleHour, splitDayTasks } from "../lib/splitDayTasks";
import { UNTIMED_DROPPABLE_ID, hourDroppableId, resolveDropTime } from "../lib/taskDrag";

type Props = {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
    onToggleComplete: (task: Task) => void;
    onAssignTime: (taskId: string, time: string | null) => void;
};

type ScheduleTaskProps = {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
    onToggleComplete: (task: Task) => void;
};

function DraggableScheduleTask({ task, onEdit, onDelete, onToggleComplete }: ScheduleTaskProps) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: task.id });

    return (
        <div ref={setNodeRef} {...listeners} {...attributes}>
            <TaskItem
                task={task}
                compact
                dragEnabled
                isDragging={isDragging}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
            />
        </div>
    );
}

export function TasksSchedule({ tasks, onEdit, onDelete, onToggleComplete, onAssignTime }: Props) {
    const { untimed, byHour } = splitDayTasks(tasks);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 8 } })
    );

    function handleDragStart(event: DragStartEvent) {
        const task = tasks.find(item => item.id === String(event.active.id));
        setActiveTask(task ?? null);
    }

    function handleDragEnd(event: DragEndEvent) {
        setActiveTask(null);

        const { active, over } = event;
        if (!over) return;

        const nextTime = resolveDropTime(String(over.id), tasks);
        if (nextTime === undefined) return;

        onAssignTime(String(active.id), nextTime);
    }

    function handleDragCancel() {
        setActiveTask(null);
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                <aside className="flex flex-col gap-3 w-full lg:w-72 shrink-0">
                    <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-sm font-semibold text-grey-800">No time assigned</h3>
                        <span className="text-xs text-grey-500">{untimed.length}</span>
                    </div>

                    <ScheduleDropZone
                        id={UNTIMED_DROPPABLE_ID}
                        className="rounded-2xl transition-colors"
                        activeClassName="bg-secondary-100/70 ring-2 ring-secondary-500/40"
                    >
                        {untimed.length === 0 ? (
                            <div className="px-4 py-6 rounded-2xl border border-dashed border-primary-200 bg-primary-100/40 text-center">
                                <p className="text-sm text-grey-500">
                                    Drop tasks here to clear their time.
                                </p>
                            </div>
                        ) : (
                            <div className="p-1 space-y-2 rounded-2xl">
                                {untimed.map(task => (
                                    <DraggableScheduleTask
                                        key={task.id}
                                        task={task}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                        onToggleComplete={onToggleComplete}
                                    />
                                ))}
                            </div>
                        )}
                    </ScheduleDropZone>
                </aside>

                <div className="min-w-0 flex-1 overflow-hidden rounded-2xl border border-primary-200 bg-white shadow-sm">
                    <div className="max-h-[70vh] overflow-y-auto overscroll-contain">
                        {SCHEDULE_HOURS.map(hour => {
                            const hourTasks = byHour[hour];
                            const time = formatScheduleHour(hour);

                            return (
                                <div
                                    key={hour}
                                    className="grid min-h-16 grid-cols-[3.5rem_1fr] border-b border-primary-100 last:border-b-0"
                                >
                                    <div className="sticky left-0 flex items-start justify-end border-r border-primary-100 bg-primary-100/40 px-2 py-2">
                                        <span className="text-xs font-medium tabular-nums text-grey-500">
                                            {time}
                                        </span>
                                    </div>

                                    <ScheduleDropZone
                                        id={hourDroppableId(hour)}
                                        className="flex flex-col gap-1.5 min-h-16 p-2 transition-colors"
                                    >
                                        {hourTasks.map(task => (
                                            <DraggableScheduleTask
                                                key={task.id}
                                                task={task}
                                                onEdit={onEdit}
                                                onDelete={onDelete}
                                                onToggleComplete={onToggleComplete}
                                            />
                                        ))}
                                    </ScheduleDropZone>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <DragOverlay dropAnimation={null}>
                {activeTask ? (
                    <div className="pointer-events-none w-[min(100vw-2rem,20rem)] scale-[1.02] shadow-lg">
                        <TaskItem
                            task={activeTask}
                            compact
                            dragEnabled
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onToggleComplete={onToggleComplete}
                        />
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
