export {
    archiveHabit,
    createHabit,
    deleteHabit,
    getCompletions,
    getHabit,
    getHabits,
    toggleCompletion,
    unarchiveHabit,
    updateHabit
} from "./api";
export type { CreateHabitInput, UpdateHabitInput } from "./api";

export {
    DAYS_OF_WEEK,
    DEFAULT_HABIT_COLOR,
    HABIT_COLORS,
    HABIT_PERIODS,
    HABITS_PAGE_VIEWS,
    createHabitFormSchema,
    formValuesFromHabit,
    frequencyFromForm,
    useHabits
} from "./model";
export type {
    Habit,
    HabitCompletion,
    HabitFormValues,
    HabitFrequency,
    HabitStats,
    HabitsPageView,
    HabitsPeriod
} from "./model";

export { filterActiveHabits, habitsDueOn } from "./lib/filterHabits";
export { isCompletedOn } from "./lib/completions";
export { isDueOn } from "./lib/isDueOn";
export { currentStreak, longestStreak } from "./lib/streaks";
export { completionRate, getHabitStats } from "./lib/rates";

export {
    ArchiveHabitModal,
    CreateHabitModal,
    DeleteHabitModal,
    EditHabitModal,
    HabitForm,
    HabitItem,
    HabitModals,
    HabitsArchiveItem,
    HabitsArchiveList,
    HabitsContent,
    HabitsFeatureGate,
    HabitsHeader,
    HabitsHeatmap,
    HabitsPage,
    HabitsPeriodNavigator,
    HabitsProgressToolbar,
    HabitsStats,
    HabitsSummary,
    HabitsTodayList,
    HabitsViewTabs
} from "./ui";