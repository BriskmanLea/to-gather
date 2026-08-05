"use client";

import type { KeyboardEvent } from "react";
import type { Task } from "@/entities/task";
import { IconMenu } from "@/shared/ui";

type Props = {
    task: Task;
    compact?: boolean;
    dragEnabled?: boolean;
    isDragging?: boolean;
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
    onToggleComplete: (task: Task) => void;
};

const priorityStyles = {
    high: "bg-error/15 text-error",
    medium: "bg-warning/15 text-warning",
    low: "bg-success/15 text-success",
};

const priorityLabel = {
    high: "High",
    medium: "Medium",
    low: "Low",
};

export function TaskItem({ task, compact = false, dragEnabled = false, isDragging = false, onEdit, onDelete, onToggleComplete }: Props) {
    const completed = task.status === "completed";

    function handleCardKeyDown(event: KeyboardEvent<HTMLElement>) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onToggleComplete(task);
        }
    }

    return (
        <article
            role="button"
            tabIndex={0}
            aria-label={completed ? `Mark as to do: ${task.title}` : `Mark as completed: ${task.title}`}
            onClick={() => onToggleComplete(task)}
            onKeyDown={handleCardKeyDown}
            className={[
                "border shadow-sm transition-all hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500",
                compact ? "rounded-xl p-2.5" : "rounded-2xl p-3 md:p-4",
                dragEnabled ? "cursor-grab active:cursor-grabbing" : "cursor-pointer",
                completed ? "border-neutral-400 bg-neutral-100" : "border-primary-200 bg-white hover:border-primary-500",
                isDragging ? "opacity-40" : completed ? "opacity-80" : ""
            ].join(" ")}
        >
            <div className={`flex items-center ${compact ? "gap-2" : "gap-2 md:gap-4"}`}>
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        onToggleComplete(task);
                    }}
                    aria-label={completed ? "Mark as to do" : "Mark as completed"}
                    aria-pressed={completed}
                    className={[
                        "flex shrink-0 items-center justify-center rounded-full border text-xs transition-colors cursor-pointer",
                        compact ? "size-4" : "mt-1 size-5",
                        completed ? "border-secondary-500 bg-secondary-500 text-white" : "border-neutral-400 bg-white hover:border-secondary-500"
                    ].join(" ")}
                >
                    {completed ? "✓" : ""}
                </button>

                <div className={`flex min-w-0 flex-1 flex-col ${compact ? "gap-1" : "gap-2"}`}>
                    <div className="flex flex-wrap items-center gap-2 no-wrap">
                        {task.time ? (
                            <span
                                className={`inline-flex items-center whitespace-nowrap rounded-full bg-secondary-100 font-semibold text-secondary-700 ${compact ? "px-2 py-0.5 text-[11px]" : "p-1 text-xs md:px-3"}`}
                            >
                                🕒 {task.time}
                            </span>
                        ) : null}

                        <h3
                            className={`leading-tight font-semibold ${compact ? "text-sm" : "text-base md:text-lg"} ${completed ? "text-grey-500 line-through" : "text-grey-800"}`}
                        >
                            {task.title}
                        </h3>
                    </div>

                    {!compact && task.description ? (
                        <p
                            className={`text-sm leading-6 ${completed ? "text-grey-500 line-through" : "text-grey-500"}`}
                        >
                            {task.description}
                        </p>
                    ) : null}
                </div>

                <div
                    className={`flex flex-col gap-1 md:flex-row-reverse items-end md:items-center`}
                >
                    <IconMenu
                        label={`Actions for ${task.title}`}
                        items={[
                            {
                                label: "Edit",
                                onSelect: () => onEdit(task),
                            },
                            {
                                label: "Delete",
                                danger: true,
                                onSelect: () => onDelete(task),
                            },
                        ]}
                    />

                    {task.priority ? (
                        <span
                            className={`rounded-full font-semibold ${compact ? "px-2 py-0.5 text-[11px]" : "px-2 py-1 text-xs md:px-3"} ${priorityStyles[task.priority]} ${completed ? "opacity-60" : ""}`}
                        >
                            {priorityLabel[task.priority]}
                        </span>
                    ) : null}
                </div>
            </div>
        </article>
    );
}
