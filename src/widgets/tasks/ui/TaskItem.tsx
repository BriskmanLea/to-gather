"use client";

import type { KeyboardEvent } from "react";
import type { Task } from "@/entities/task";
import { IconMenu } from "@/shared/ui";

type Props = {
    task: Task;
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

export function TaskItem({ task, onEdit, onDelete, onToggleComplete }: Props) {
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
            className={`cursor-pointer rounded-2xl border p-3 md:p-4 shadow-sm transition-all hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500 ${completed ? "border-neutral-400 bg-neutral-100 opacity-80" : "border-primary-200 bg-white hover:border-primary-500"}`}
        >
            <div className="flex items-center gap-2 md:gap-4">
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        onToggleComplete(task);
                    }}
                    aria-label={completed ? "Mark as to do" : "Mark as completed"}
                    aria-pressed={completed}
                    className={[
                        "mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border text-xs transition-colors",
                        completed ? "border-secondary-500 bg-secondary-500 text-white" : "border-neutral-400 bg-white hover:border-secondary-500"
                    ].join(" ")}
                >
                    {completed ? "✓" : ""}
                </button>

                <div className="flex flex-col gap-2 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 no-wrap">
                        {task.time ? (
                            <span className="inline-flex items-center p-1 md:px-3 text-xs font-semibold text-secondary-700 whitespace-nowrap rounded-full bg-secondary-100">
                                🕒 {task.time}
                            </span>
                        ) : null}

                        <h3
                            className={`text-base md:text-lg leading-tight font-semibold ${completed ? "text-grey-500 line-through" : "text-grey-800"}`}
                        >
                            {task.title}
                        </h3>
                    </div>

                    {task.description ? (
                        <p className={`text-sm leading-6 ${completed ? "text-grey-500 line-through" : "text-grey-500"}`}>
                            {task.description}
                        </p>
                    ) : null}
                </div>

                <div className="flex flex-col md:flex-row-reverse items-end md:items-center md:gap-2">
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
                            className={`rounded-full py-1 px-2 md:px-3 text-xs font-semibold ${priorityStyles[task.priority]} ${completed ? "opacity-60" : ""}`}
                        >
                            {priorityLabel[task.priority]}
                        </span>
                    ) : null}
                </div>
            </div>
        </article>
    );
}
