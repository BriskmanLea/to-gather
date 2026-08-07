import { getCurrentUser } from "@/domains/user";
import { getHomeData } from "../api";
import { GoalsCard } from "./GoalsCard";
import { HabitsCard } from "./HabitsCard";
import { Overview } from "./Overview";
import { QuickActionsCard } from "./QuickActionsCard";
import { TasksCard } from "./TasksCard";
import { Welcome } from "./Welcome";

export async function HomePage() {
    const [user, homeData] = await Promise.all([
        getCurrentUser(),
        getHomeData(),
    ]);

    return (
        <div className="w-full max-w-7xl mx-auto">
            <Welcome firstName={user.firstName} />

            <Overview items={homeData.overview} />

            <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr] mt-6">
                <TasksCard tasks={homeData.tasks} />
                <HabitsCard habits={homeData.habits} />
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr] mt-6">
                <GoalsCard goals={homeData.goals} />
                <QuickActionsCard />
            </section>
        </div>
    );
}