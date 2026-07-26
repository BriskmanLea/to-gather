import type { InputHTMLAttributes } from "react";

type DatePickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function DatePicker({ className = "", ...props }: DatePickerProps) {
    return (
        <input
            type="date"
            className={`w-full md:w-auto rounded-xl border border-primary-200 bg-white px-4 py-3 text-grey-800 outline-none transition-all focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200 ${className}`}
            {...props}
        />
    );
}