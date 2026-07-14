import Link, { type LinkProps } from "next/link";
import type { PropsWithChildren } from "react";
import { getButtonClassName, type ButtonVariant } from "./button-styles";

type ButtonLinkProps = PropsWithChildren<
    LinkProps & {
        className?: string;
        variant?: ButtonVariant;
    }
>;

export function ButtonLink({
    children,
    className = "",
    variant = "primary",
    ...props
}: ButtonLinkProps) {
    return (
        <Link
            className={getButtonClassName(variant, className)}
            {...props}
        >
            {children}
        </Link>
    );
}