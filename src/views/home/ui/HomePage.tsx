import { GoalsCard, HabitsCard, Overview, QuickActionsCard, TasksCard, Welcome, getHomeData } from "@/widgets/home";
import { getCurrentUser } from "@/widgets/current-user";

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