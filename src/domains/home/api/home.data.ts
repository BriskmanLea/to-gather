import type { HomeData } from "../model/types";

export const homeData: HomeData = {
    overview: [
        {
            label: "Tasks",
            value: "12",
            description: "5 completed today",
        },
        {
            label: "Habits",
            value: "0/0",
            description: "Today's progress",
        },
        // {
        //     label: "Goals",
        //     value: "3",
        //     description: "2 active goals",
        // },
        // {
        //     label: "Focus",
        //     value: "78%",
        //     description: "Weekly productivity",
        // },
    ],

    tasks: [],

    habits: [],

    goals: [
        // {
        //     id: "goal-1",
        //     title: "Prepare for interviews",
        //     progress: 72,
        // },
        // {
        //     id: "goal-2",
        //     title: "Launch MVP of ToGather",
        //     progress: 38,
        // },
        // {
        //     id: "goal-3",
        //     title: "Visit 3 new countries this year",
        //     progress: 66,
        // },
    ],
};