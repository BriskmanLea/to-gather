"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CurrentUser } from "./types";
import { currentUser } from "../api/current-user.data";
import { DEFAULT_FEATURES, type AppFeatureId } from "./features";

export type TasksPreferences = {
    dayStartHour: number;
};

type CurrentUserState = {
    user: CurrentUser;
    tasksPreferences: TasksPreferences;
    features: Record<AppFeatureId, boolean>;
    hasHydrated: boolean;
    updateUser: (user: Pick<CurrentUser, "firstName" | "lastName" | "email">) => void;
    updateTasksPreferences: (preferences: TasksPreferences) => void;
    setFeatureEnabled: (id: AppFeatureId, enabled: boolean) => void;
    setHasHydrated: (hasHydrated: boolean) => void;
};

export const useCurrentUserStore = create<CurrentUserState>()(
    persist(
        set => ({
            user: currentUser,
            tasksPreferences: {
                dayStartHour: 0,
            },
            features: { ...DEFAULT_FEATURES },
            hasHydrated: false,
            updateUser: user => set(state => ({
                user: {
                    ...state.user,
                    ...user,
                },
            })),
            updateTasksPreferences: tasksPreferences => set({ tasksPreferences }),
            setFeatureEnabled: (id, enabled) => set(state => ({
                features: {
                    ...state.features,
                    [id]: enabled,
                },
            })),
            setHasHydrated: hasHydrated => set({ hasHydrated }),
        }),
        {
            name: "to-gather-user-settings",
            skipHydration: true,
            partialize: state => ({
                user: state.user,
                tasksPreferences: state.tasksPreferences,
                features: state.features,
            }),
            merge: (persistedState, currentState) => {
                const persisted = persistedState as Partial<CurrentUserState> | undefined;

                return {
                    ...currentState,
                    ...persisted,
                    features: {
                        ...DEFAULT_FEATURES,
                        ...persisted?.features,
                    },
                };
            },
            onRehydrateStorage: () => state => {
                state?.setHasHydrated(true);
            },
        }
    )
);

export function useFeatureEnabled(id: AppFeatureId) {
    return useCurrentUserStore(state => state.features[id] ?? DEFAULT_FEATURES[id]);
}