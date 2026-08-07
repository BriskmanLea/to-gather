import Link from "next/link";

const quickActions = [
    {
        label: "Add task",
        href: "/tasks/new",
    },
    {
        label: "Create note",
        href: "/notes/new",
    },
    {
        label: "Track habit",
        href: "/habits/new",
    },
    {
        label: "Add expense",
        href: "/finance/new",
    },
];

export function QuickActionsCard() {
    return (
        <article className="p-6 rounded-3xl border border-secondary-200 bg-secondary-100 shadow-sm shadow-neutral-700/5">
            <h2 className="text-xl font-semibold text-grey-800">
                Quick actions
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {quickActions.map((action) => (
                    <Link
                        key={action.href}
                        href={action.href}
                        className="px-4 py-3 rounded-2xl border border-secondary-200 bg-white/70  font-medium text-grey-800 transition-colors hover:border-secondary-500 hover:bg-white"
                    >
                        <span
                            aria-hidden="true"
                            className="mr-2 text-secondary-700"
                        >
                            +
                        </span>

                        {action.label}
                    </Link>
                ))}
            </div>
        </article>
    );
}