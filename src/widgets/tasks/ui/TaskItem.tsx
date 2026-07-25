import type { Task } from "../model";

type Props = {
    task: Task;
};

const priorityStyles = {
    high: "bg-error/15 text-error",
    medium: "bg-warning/15 text-warning",
    low: "bg-success/15 text-success",
};

const priorityLabel = {
    high: "High",
    medium: "Medium",
    low: "Low",
};

export function TaskItem({ task }: Props) {
    const completed = task.status === "completed";

    return (
        <article
            className={`rounded-2xl border p-3 md:p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${completed ? "border-neutral-400 bg-neutral-100 opacity-80" : "border-primary-200 bg-white hover:border-primary-500"}`}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            {task.time && (
                                <span className="inline-flex items-center rounded-full bg-secondary-100 px-3 py-1 text-xs font-semibold text-secondary-700 whitespace-nowrap">
                                    🕒 {task.time}
                                </span>
                            )}
                            <h3
                                className={`text-base md:text-lg leading-tight md:leading-tight font-semibold ${completed
                                    ? "text-grey-500 line-through"
                                    : "text-grey-800"
                                    }`}
                            >
                                {task.title}
                            </h3>
                        </div>

                        {task.description && (
                            <p
                                className={`text-sm leading-6 ${completed ? "text-grey-500 line-through" : "text-grey-500"}`}
                            >
                                {task.description}
                            </p>
                        )}
                    </div>
                </div>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[task.priority]} ${completed ? "opacity-60" : ""}`}
                >
                    {priorityLabel[task.priority]}
                </span>
            </div>
        </article>
    );
}