import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className = "", rows = 4, ...props }: TextareaProps) {
    return (
        <textarea
            rows={rows}
            className={`w-full rounded-xl border border-primary-200 bg-white px-4 py-3 text-grey-800 placeholder:text-grey-500 outline-none transition-all resize-none focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200 ${className}`}
            {...props}
        />
    );
}