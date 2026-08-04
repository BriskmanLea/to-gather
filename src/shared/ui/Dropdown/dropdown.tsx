import type { SelectHTMLAttributes } from "react";

type Option = {
    value: string;
    label: string;
};

type DropdownProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
    options: Option[];
};

export function Dropdown({ options, className = "", ...props }: DropdownProps) {
    return (
        <select
            className={`w-full md:w-auto rounded-xl border border-primary-200 bg-white px-4 py-3 text-grey-800 outline-none transition-all focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200 ${className}`}
            {...props}
        >
            {options.map(option => (
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
}