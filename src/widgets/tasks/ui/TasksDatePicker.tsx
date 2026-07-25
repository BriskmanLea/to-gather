type Props = {
    value: Date;
    onChange: (date: Date) => void;
};

export function TasksDatePicker({ value, onChange }: Props) {
    return (
        <input
            type="date"
            value={value.toISOString().split("T")[0]}
            onChange={e => onChange(new Date(e.target.value))}
            className="w-full md:w-auto rounded-xl border border-primary-200 bg-white px-4 py-3 text-grey-800 outline-none transition-all focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200"
        />
    );
}