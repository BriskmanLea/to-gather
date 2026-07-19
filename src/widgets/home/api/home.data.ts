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
            value: "4/6",
            description: "Today's progress",
        },
        {
            label: "Goals",
            value: "3",
            description: "2 active goals",
        },
        {
            label: "Focus",
            value: "78%",
            description: "Weekly productivity",
        },
    ],

    tasks: [
        {
            id: "task-1",
            title: "Feed cat",
            completed: true,
            time: "09:30",
        },
        {
            id: "task-2",
            title: "Work on the project",
            completed: true,
            time: "11:00",
        },
        {
            id: "task-3",
            title: "Wash dishes",
            completed: false,
            time: "18:00",
        },
        {
            id: "task-4",
            title: "Go to the gym",
            completed: false,
            time: "20:00",
        },
        {
            id: "task-5",
            title: "Read 30 pages",
            completed: false,
        },
    ],

    habits: [
        {
            id: "habit-1",
            title: "Drink 2L of water",
            completed: true,
        },
        {
            id: "habit-2",
            title: "Morning stretching",
            completed: true,
        },
        {
            id: "habit-3",
            title: "Read every day",
            completed: true,
        },
        {
            id: "habit-4",
            title: "Meditation",
            completed: false,
        },
        {
            id: "habit-5",
            title: "No sugar",
            completed: false,
        },
        {
            id: "habit-6",
            title: "Sleep before 23:00",
            completed: true,
        },
    ],

    goals: [
        {
            id: "goal-1",
            title: "Prepare for interviews",
            progress: 72,
        },
        {
            id: "goal-2",
            title: "Launch MVP of ToGather",
            progress: 38,
        },
        {
            id: "goal-3",
            title: "Visit 3 new countries this year",
            progress: 66,
        },
    ],
};