"use client";

import type { Task } from "@/domains/tasks";
import { useCurrentUserStore, type AppFeatureId } from "@/domains/user";
import type { Goal, Habit, OverviewItem } from "../model/types";
// import { GoalsCard } from "./GoalsCard";
// import { HabitsCard } from "./HabitsCard";
import { Overview } from "./Overview";
import { QuickActionsCard } from "./QuickActionsCard";
import { TasksCard } from "./TasksCard";

const OVERVIEW_FEATURE_BY_LABEL: Record<string, AppFeatureId | null> = {
    Tasks: "tasks",
    // Habits: "habits",
    // Goals: "goals",
    Focus: null,
};

const QUICK_ACTION_FEATURES: AppFeatureId[] = [
    "tasks",
    // "notes",
    // "habits",
    // "finance",
];

type HomeDashboardProps = {
    overview: OverviewItem[];
    tasks: Task[];
    habits: Habit[];
    goals: Goal[];
};

export function HomeDashboard({
    overview,
    tasks,
    // habits,
    // goals,
}: HomeDashboardProps) {
    const features = useCurrentUserStore(state => state.features);
    const isTasksEnabled = features.tasks;
    // const isHabitsEnabled = features.habits;
    // const isGoalsEnabled = features.goals;
    const hasQuickActions = QUICK_ACTION_FEATURES.some(id => features[id]);

    const visibleOverview = overview.filter(item => {
        const featureId = OVERVIEW_FEATURE_BY_LABEL[item.label];

        if (featureId === undefined) {
            // Labels for modules that are temporarily disabled stay hidden.
            return false;
        }

        if (featureId == null) {
            return true;
        }

        return features[featureId];
    });

    const showPrimarySection = isTasksEnabled;
    // || isHabitsEnabled;
    const showSecondarySection = hasQuickActions;
    // || isGoalsEnabled;

    return (
        <>
            {visibleOverview.length > 0 ? (
                <Overview items={visibleOverview} />
            ) : null}

            {showPrimarySection ? (
                <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr] mt-6">
                    {isTasksEnabled ? <TasksCard tasks={tasks} /> : null}
                    {/* {isHabitsEnabled ? <HabitsCard habits={habits} /> : null} */}
                </section>
            ) : null}

            {/* {showSecondarySection ? (
                <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr] mt-6">
                    {isGoalsEnabled ? <GoalsCard goals={goals} /> : null}
                    {hasQuickActions ? <QuickActionsCard /> : null}
                </section>
            ) : null} */}
        </>
    );
}
