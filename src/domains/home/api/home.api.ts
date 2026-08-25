import { toDateKey } from "@/shared/lib";
import { getCompletions, getHabits, habitsDueOn, isCompletedOn } from "@/domains/habits";
import { getTasks } from "@/domains/tasks";
import { homeData } from "./home.data";

/** TODO(backend): fetch dashboard data */
export async function getHomeData() {
    const [tasks, habits, completions] = await Promise.all([
        getTasks(),
        getHabits(),
        getCompletions(),
    ]);
    const today = toDateKey(new Date());
    const dueToday = habitsDueOn(habits, today);
    const completedToday = dueToday.filter(habit => isCompletedOn(completions, habit.id, today)).length;

    return {
        ...homeData,
        overview: homeData.overview.map(item => {
            if (item.label !== "Habits") {
                return item;
            }

            return {
                ...item,
                value: `${completedToday}/${dueToday.length}`,
                description: "Today's progress",
            };
        }),
        tasks: tasks.filter(task => task.date === today),
        habits: dueToday.map(habit => ({
            id: habit.id,
            title: habit.title,
            completed: isCompletedOn(completions, habit.id, today),
            color: habit.color,
        })),
    };
}