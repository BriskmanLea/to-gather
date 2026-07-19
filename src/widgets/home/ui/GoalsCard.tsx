import Link from "next/link";
import type { Goal } from "../model/types";

type GoalsCardProps = {
    goals: Goal[];
};

function normalizeProgress(progress: number) {
    return Math.min(Math.max(progress, 0), 100);
}

export function GoalsCard({ goals }: GoalsCardProps) {
    return (
        <article className="p-6 rounded-3xl border border-neutral-400/50 bg-white shadow-sm shadow-neutral-700/5">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-grey-800">Active goals</h2>

                <Link
                    href="/goals"
                    className="text-sm font-medium text-secondary-700 transition-colors hover:text-secondary-800"
                >
                    View goals
                </Link>
            </div>

            {goals.length > 0 ? (
                <ul className="grid gap-5 mt-5">
                    {goals.map((goal) => {
                        const progress = normalizeProgress(goal.progress);

                        return (
                            <li key={goal.id}>
                                <div className="flex items-center justify-between gap-4">
                                    <p className="font-medium text-grey-800">
                                        {goal.title}
                                    </p>

                                    <span className="shrink-0 text-sm font-semibold text-secondary-700">
                                        {progress}%
                                    </span>
                                </div>

                                <div
                                    role="progressbar"
                                    aria-label={`${goal.title} progress`}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-valuenow={progress}
                                    className="h-2 mt-3 overflow-hidden rounded-full bg-primary-100"
                                >
                                    <div
                                        className="h-full rounded-full bg-primary-500 transition-[width]"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className="mt-5 p-6 rounded-2xl border border-dashed border-neutral-400 text-center">
                    <p className="text-sm text-grey-500">
                        You have no active goals yet.
                    </p>
                </div>
            )}
        </article>
    );
}