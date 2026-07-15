import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
    return (
        <input
            className={`w-full rounded-xl border border-neutral-400 bg-white px-4 py-3 text-grey-800 placeholder:text-grey-500/70 transition-colors hover:border-neutral-700 focus:border-secondary-500 focus:outline-none aria-invalid:border-error disabled:cursor-not-allowed disabled:bg-grey-200 disabled:opacity-70 ${className}`}
            {...props}
        />
    );
}