"use client";

import { RequireFeature } from "@/domains/user";
import type { Task } from "../model";
import { TasksContent } from "./TasksContent";

type TasksFeatureGateProps = {
    tasks: Task[];
};

export function TasksFeatureGate({ tasks }: TasksFeatureGateProps) {
    return (
        <RequireFeature featureId="tasks">
            <TasksContent tasks={tasks} />
        </RequireFeature>
    );
}
