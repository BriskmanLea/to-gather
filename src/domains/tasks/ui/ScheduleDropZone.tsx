"use client";

import type { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";

type Props = {
    id: string;
    children: ReactNode;
    className?: string;
    activeClassName?: string;
};

export function ScheduleDropZone({ id, children, className = "", activeClassName = "bg-secondary-100/70 ring-2 ring-inset ring-secondary-500/40" }: Props) {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={`${className} ${isOver ? activeClassName : ""}`}
        >
            {children}
        </div>
    );
}