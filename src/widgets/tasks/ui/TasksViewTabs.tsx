import { TASK_VIEWS, type TasksView } from "../model";

type TasksViewTabsProps = {
    value: TasksView;
    onChange: (value: TasksView) => void;
};

export function TasksViewTabs({ value, onChange }: TasksViewTabsProps) {
    return (
        <div className="inline-flex gap-2 w-full rounded-xl bg-primary-100">
            {TASK_VIEWS.map(tab => {
                const active = value === tab.value;

                return (
                    <button
                        key={tab.value}
                        type="button"
                        onClick={() => onChange(tab.value)}
                        className={`w-full md:w-auto rounded-lg px-4 py-2 text-sm font-medium transition-all cursor-pointer ${active ? "bg-secondary-500 text-white shadow-sm" : "bg-secondary-100 text-grey-800 hover:bg-secondary-200"}`}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}