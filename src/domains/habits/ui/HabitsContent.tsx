"use client";

import { useEffect, useMemo, useState } from "react";
import { toDateKey } from "@/shared/lib";
import { isCompletedOn } from "../lib/completions";
import { habitsDueOn } from "../lib/filterHabits";
import { getHeatmapRange, getPeriodRange } from "../lib/period";
import { useHabits, Habit, HabitCompletion, HabitsPageView, HabitsPeriod } from "../model";
import { HabitModals } from "./HabitModals";
import { HabitsArchiveList } from "./HabitsArchiveList";
import { HabitsHeader } from "./HabitsHeader";
import { HabitsHeatmap } from "./HabitsHeatmap";
import { HabitsProgressToolbar } from "./HabitsProgressToolbar";
import { HabitsStats } from "./HabitsStats";
import { HabitsSummary } from "./HabitsSummary";
import { HabitsTodayList } from "./HabitsTodayList";
import { HabitsViewTabs } from "./HabitsViewTabs";

type HabitsContentProps = {
    habits: Habit[];
    completions: HabitCompletion[];
};

export function HabitsContent({ habits: initialHabits, completions: initialCompletions }: HabitsContentProps) {
    const {
            habits,
            completions,
            editingHabit,
            archivingHabit,
            deletingHabit,
            isCreateOpen,
            setEditingHabit,
            setArchivingHabit,
            setDeletingHabit,
            setIsCreateOpen,
            create,
            edit,
            archive,
            restore,
            remove,
            toggle,
            closeEdit,
            closeArchive,
            closeDelete,
            closeCreate
        } = useHabits(initialHabits, initialCompletions);

    const [view, setView] = useState<HabitsPageView>("today");
    const [period, setPeriod] = useState<HabitsPeriod>("month");
    const [anchor, setAnchor] = useState(() => new Date());
    const [selectedHabitId, setSelectedHabitId] = useState("all");
    const today = toDateKey(new Date());

    const activeHabits = useMemo(
        () => habits.filter(habit => !habit.archived),
        [habits]
    );
    const archivedHabits = useMemo(
        () => habits.filter(habit => habit.archived),
        [habits]
    );
    const dueToday = useMemo(() => habitsDueOn(habits, today), [habits, today]);
    const completedTodayIds = useMemo(() => {
        const ids = new Set<string>();
        for (const habit of dueToday) {
            if (isCompletedOn(completions, habit.id, today)) {
                ids.add(habit.id);
            }
        }
        return ids;
    }, [dueToday, completions, today]);

    const statsRange = useMemo(() => getPeriodRange(period, anchor), [period, anchor]);
    const heatmapRange = useMemo(() => getHeatmapRange(period, anchor), [period, anchor]);

    function handlePeriodChange(next: HabitsPeriod) {
        setPeriod(next);
        setAnchor(new Date());
    }

    const statsHabits = useMemo(() => {
        if (selectedHabitId === "all") {
            return activeHabits;
        }

        return activeHabits.filter(habit => habit.id === selectedHabitId);
    }, [activeHabits, selectedHabitId]);

    useEffect(() => {
        if (
            selectedHabitId !== "all" &&
            !activeHabits.some(habit => habit.id === selectedHabitId)
        ) {
            setSelectedHabitId("all");
        }
    }, [activeHabits, selectedHabitId]);

    return (
        <div className="mx-auto flex max-w-6xl min-w-0 flex-col gap-6">
            <HabitsHeader onCreateClick={() => setIsCreateOpen(true)} />

            <HabitsViewTabs value={view} onChange={setView} />

            {view === "today" ? (
                <>
                    <HabitsSummary
                        completed={completedTodayIds.size}
                        total={dueToday.length}
                    />

                    <HabitsTodayList
                        habits={dueToday}
                        completedIds={completedTodayIds}
                        onToggle={habit => toggle(habit.id, today)}
                        onEdit={setEditingHabit}
                        onArchive={setArchivingHabit}
                        onDelete={setDeletingHabit}
                    />
                </>
            ) : null}

            {view === "progress" ? (
                <>
                    <HabitsProgressToolbar
                        period={period}
                        anchor={anchor}
                        selectedHabitId={selectedHabitId}
                        habits={activeHabits}
                        onPeriodChange={handlePeriodChange}
                        onAnchorChange={setAnchor}
                        onSelectedHabitChange={setSelectedHabitId}
                    />

                    <HabitsHeatmap
                        habits={activeHabits}
                        completions={completions}
                        period={period}
                        from={heatmapRange.from}
                        to={heatmapRange.to}
                        selectedHabitId={selectedHabitId}
                        onToggleDay={(habitId, dateKey) => toggle(habitId, dateKey)}
                    />

                    <HabitsStats
                        habits={statsHabits}
                        completions={completions}
                        from={statsRange.from}
                        to={statsRange.to}
                    />
                </>
            ) : null}

            {view === "archive" ? (
                <HabitsArchiveList
                    habits={archivedHabits}
                    onRestore={habit => void restore(habit)}
                    onDelete={setDeletingHabit}
                />
            ) : null}

            <HabitModals
                isCreateOpen={isCreateOpen}
                editingHabit={editingHabit}
                archivingHabit={archivingHabit}
                deletingHabit={deletingHabit}
                onCloseCreate={closeCreate}
                onCloseEdit={closeEdit}
                onCloseArchive={closeArchive}
                onCloseDelete={closeDelete}
                onCreate={create}
                onSave={edit}
                onConfirmArchive={archive}
                onConfirmDelete={remove}
            />
        </div>
    );
}