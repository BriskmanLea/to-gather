type Props = {
    total: number;
    todo: number;
    completed: number;
};

export function TasksSummary({ total, todo, completed }: Props) {
    return (
        <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full bg-primary-200/50 text-sm font-medium text-primary-800">
                {total} Tasks
            </span>

            <span className="px-4 py-2 rounded-full bg-warning/15 text-sm font-medium text-warning">
                {todo} Todo
            </span>

            <span className="px-4 py-2 rounded-full bg-success/15 text-sm font-medium text-success">
                {completed} Completed
            </span>
        </div>
    );
}