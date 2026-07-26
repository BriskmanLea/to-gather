import type { InputHTMLAttributes } from "react";

type TimePickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function TimePicker({ className = "", ...props }: TimePickerProps) {
    return (
        <input
            type="time"
            className={`w-full rounded-xl border border-primary-200 bg-white px-4 py-3 text-grey-800 outline-none transition-all focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200 ${className}`}
            {...props}
        />
    );
}