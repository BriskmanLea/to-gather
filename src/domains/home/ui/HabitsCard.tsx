import Link from "next/link";
import type { Habit } from "../model/types";

type HabitsCardProps = {
    habits: Habit[];
};

export function HabitsCard({
    habits,
}: HabitsCardProps) {
    const completedHabits = habits.filter(habit => habit.completed).length;

    const progress = habits.length > 0 ? Math.round((completedHabits / habits.length) * 100) : 0;

    return (
        <article className="p-6 rounded-3xl border border-neutral-400/50 bg-white shadow-sm shadow-neutral-700/5">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-grey-800">
                    Habit progress
                </h2>

                <Link
                    href="/habits"
                    className="text-sm font-medium text-secondary-700 transition-colors hover:text-secondary-800"
                >
                    {completedHabits}/{habits.length}
                </Link>
            </div>

            <div className="mt-5">
                <div
                    role="progressbar"
                    aria-label="Daily habit progress"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={progress}
                    className="h-2 overflow-hidden rounded-full bg-secondary-100"
                >
                    <div
                        className="h-full rounded-full bg-secondary-500 transition-[width]"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <p className="mt-2 text-sm text-grey-500">
                    {progress}% completed today
                </p>
            </div>

            {habits.length > 0 ? (
                <ul className="grid gap-3 mt-5">
                    {habits.map((habit) => (
                        <li
                            key={habit.id}
                            className="flex items-center justify-between gap-3"
                        >
                            <span
                                className={
                                    habit.completed
                                        ? "text-grey-500 line-through"
                                        : "text-grey-800"
                                }
                            >
                                {habit.title}
                            </span>

                            <span
                                aria-label={habit.completed ? "Completed" : "Not completed"}
                                className={[
                                    "size-3 shrink-0 rounded-full",
                                    habit.completed
                                        ? "bg-success"
                                        : "bg-neutral-400",
                                ].join(" ")}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="mt-5 rounded-2xl border border-dashed border-neutral-400 p-6 text-center">
                    <p className="text-sm text-grey-500">
                        You have not added any habits yet.
                    </p>
                </div>
            )}
        </article>
    );
}