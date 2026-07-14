import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { getButtonClassName, type ButtonVariant } from "./button-styles";

type ButtonProps = PropsWithChildren<
    ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: ButtonVariant;
    }
>;

export function Button({
    children,
    variant = "primary",
    className = "",
    type = "button",
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            className={getButtonClassName(variant, className)}
            {...props}
        >
            {children}
        </button>
    );
}