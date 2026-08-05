"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CurrentUser } from "./types";
import { currentUser } from "../api/current-user.data";

export type TasksPreferences = {
    dayStartHour: number;
};

type CurrentUserState = {
    user: CurrentUser;
    tasksPreferences: TasksPreferences;
    updateUser: (user: Pick<CurrentUser, "firstName" | "lastName" | "email">) => void;
    updateTasksPreferences: (preferences: TasksPreferences) => void;
};

export const useCurrentUserStore = create<CurrentUserState>()(
    persist(
        set => ({
            user: currentUser,
            tasksPreferences: {
                dayStartHour: 0,
            },
            updateUser: user => set(state => ({
                user: {
                    ...state.user,
                    ...user,
                },
            })),
            updateTasksPreferences: tasksPreferences => set({ tasksPreferences }),
        }),
        {
            name: "to-gather-user-settings",
            skipHydration: true,
        }
    )
);