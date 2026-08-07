import { getCurrentUser } from "@/domains/user";
import { getHomeData } from "../api";
import { HomeDashboard } from "./HomeDashboard";
import { Welcome } from "./Welcome";

export async function HomePage() {
    const [user, homeData] = await Promise.all([
        getCurrentUser(),
        getHomeData(),
    ]);

    return (
        <div className="w-full max-w-7xl mx-auto">
            <Welcome firstName={user.firstName} />

            <HomeDashboard
                overview={homeData.overview}
                tasks={homeData.tasks}
                habits={homeData.habits}
                goals={homeData.goals}
            />
        </div>
    );
}