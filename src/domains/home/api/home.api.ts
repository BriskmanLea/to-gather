import { toDateKey } from "@/shared/lib";
import { getTasks } from "@/domains/tasks";
import { homeData } from "./home.data";

/** TODO(backend): fetch dashboard data */
export async function getHomeData() {
    const tasks = await getTasks();
    const today = toDateKey(new Date());

    return {
        ...homeData,
        tasks: tasks.filter(task => task.date === today),
    };
}