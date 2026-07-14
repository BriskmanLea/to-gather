import type { ReactNode } from "react";

type FormFieldProps = {
    children: ReactNode;
    error?: string;
    htmlFor: string;
    label: string;
};

export function FormField({ children, error, htmlFor, label }: FormFieldProps) {
    const errorId = `${htmlFor}-error`;

    return (
        <div>
            <label
                htmlFor={htmlFor}
                className="block mb-2 text-sm font-medium text-grey-800"
            >
                {label}
            </label>

            {children}

            {error ? (
                <p id={errorId} className="mt-2 text-sm text-error">
                    {error}
                </p>
            ) : null}
        </div>
    );
}