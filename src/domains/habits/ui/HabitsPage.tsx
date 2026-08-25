import { getCompletions, getHabits } from "../api";
import { HabitsFeatureGate } from "./HabitsFeatureGate";

export async function HabitsPage() {
    const [habits, completions] = await Promise.all([getHabits(), getCompletions()]);

    return <HabitsFeatureGate habits={habits} completions={completions} />;
}