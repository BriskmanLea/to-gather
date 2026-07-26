import type { InputHTMLAttributes } from "react";

type TimePickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function TimePicker({ className = "", ...props }: TimePickerProps) {
    return (
        <input
            type="time"
            className={`w-fullrounded-xlborderborder-primary-200bg-whitepx-4py-3text-grey-800outline-nonetransition-allfocus:border-secondary-500focus:ring-2focus:ring-secondary-200 ${className}`}
            {...props}
        />
    );
}