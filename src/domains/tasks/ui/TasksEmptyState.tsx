export function TasksEmptyState() {
    return (
        <div className="rounded-2xl border-2 border-dashed border-primary-200 bg-primary-100/60 py-12 px-6 text-center">
            <div className="space-y-2">
                <h3 className="font-semibold text-grey-800">
                    No tasks found
                </h3>

                <p className="text-sm text-grey-500">
                    Try changing your filters or create a new task.
                </p>
            </div>
        </div>
    );
}