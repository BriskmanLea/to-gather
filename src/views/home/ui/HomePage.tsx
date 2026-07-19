import { GoalsCard, HabitsCard, Overview, QuickActionsCard, TasksCard, Welcome, getHomeData } from "@/widgets/home";
import { getCurrentUser } from "@/widgets/current-user";

export async function HomePage() {
    const data = await getHomeData();

    const [user, homeData] = await Promise.all([
        getCurrentUser(),
        getHomeData(),
    ]);

    return (
        <div className="w-full max-w-7xl mx-auto">
            <Welcome firstName={user.firstName} />

            <Overview items={homeData.overview} />

            <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr] mt-6">
                <TasksCard tasks={data.tasks} />
                <HabitsCard habits={data.habits} />
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr] mt-6">
                <GoalsCard goals={data.goals} />
                <QuickActionsCard />
            </section>
        </div>
    );
}