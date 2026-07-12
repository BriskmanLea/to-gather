import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = PropsWithChildren<
    ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: ButtonVariant;
    }
>;

const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-primary-500 text-grey-800 hover:bg-primary-700 hover:text-white",
    secondary: "border border-secondary-500 bg-secondary-100 text-secondary-800 hover:bg-secondary-200"
};

export function Button({
    children,
    variant = "primary",
    className = "",
    type = "button",
    ...props
}: ButtonProps) {
    return (
        <button
            className={`px-6 py-3 cursor-pointer rounded-full font-medium transition disabled:pointer-events-none disabled:opacity-50 ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}