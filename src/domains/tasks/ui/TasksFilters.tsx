"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import type { TaskPriority, TaskStatus } from "../model";
import { Dropdown } from "@/shared/ui";

type Props = {
    status: TaskStatus | "all";
    priority: TaskPriority | "all";
    onStatusChange: (value: TaskStatus | "all") => void;
    onPriorityChange: (value: TaskPriority | "all") => void;
};

export function TasksFilters({ status, priority, onStatusChange, onPriorityChange }: Props) {
    const t = useTranslations("Tasks");

    const statusOptions = useMemo(
        () => [
            { value: "all", label: t("allStatuses") },
            { value: "todo", label: t("statusTodo") },
            { value: "completed", label: t("statusCompleted") },
        ],
        [t]
    );

    const priorityOptions = useMemo(
        () => [
            { value: "all", label: t("allPriorities") },
            { value: "high", label: t("priorityHigh") },
            { value: "medium", label: t("priorityMedium") },
            { value: "low", label: t("priorityLow") },
        ],
        [t]
    );

    return (
        <div className="flex justify-between gap-4">
            <Dropdown options={statusOptions} value={status} onChange={(e) => onStatusChange(e.target.value as TaskStatus | "all")} />

            <Dropdown options={priorityOptions} value={priority} onChange={(e) => onPriorityChange(e.target.value as TaskPriority | "all")} />
        </div>
    );
}
