type Props = {
    value: string;
    onChange: (value: string) => void;
};

export function TasksSearch({ value, onChange }: Props) {
    return (
        <input
            type="text"
            placeholder="Search tasks..."
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full rounded-xl border border-primary-200 bg-white px-4 py-3 text-grey-800 placeholder:text-grey-500 outline-none transition-all focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200"
        />
    );
}