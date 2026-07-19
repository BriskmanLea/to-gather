import Link from "next/link";
import type { Task } from "../model/types";

type TasksCardProps = {
    tasks: Task[];
};

export function TasksCard({ tasks }: TasksCardProps) {
    return (
        <article className="p-6 rounded-3xl border border-neutral-400/50 bg-white shadow-sm shadow-neutral-700/5">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-grey-800">Today's tasks</h2>

                <Link
                    href="/tasks"
                    className="text-sm font-medium text-secondary-700 transition-colors hover:text-secondary-800"
                >
                    View all
                </Link>
            </div>

            {tasks.length > 0 ? (
                <ul className="grid gap-3 mt-5">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className="flex items-center gap-3 p-4 rounded-2xl border border-neutral-400/40 bg-neutral-100"
                        >
                            <span
                                aria-hidden="true"
                                className={[
                                    "flex justify-center size-5 shrink-0 items-center rounded-full border text-xs",
                                    task.completed ? "border-secondary-500 bg-secondary-500 text-white" : "border-neutral-400 bg-white"
                                ].join(" ")}
                            >
                                {task.completed ? "✓" : ""}
                            </span>

                            <p
                                className={[
                                    "min-w-0 flex-1 font-medium",
                                    task.completed ? "text-grey-500 line-through" : "text-grey-800"
                                ].join(" ")}
                            >
                                {task.title}
                            </p>

                            {task.time ? (
                                <time className="shrink-0 text-sm text-grey-500">
                                    {task.time}
                                </time>
                            ) : null}
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="mt-5 rounded-2xl border border-dashed border-neutral-400 p-6 text-center">
                    <p className="text-sm text-grey-500">
                        You have no tasks planned for today.
                    </p>
                </div>
            )}
        </article>
    );
}