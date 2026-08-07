import { DatePicker } from "@/shared/ui";

type Props = {
    value: Date;
    onChange: (date: Date) => void;
};

export function TasksDatePicker({ value, onChange }: Props) {
    return (
        <DatePicker value={value.toISOString().split("T")[0]} onChange={(e) => onChange(new Date(e.target.value))} />
    );
}