import { Link } from "@/i18n/navigation";
import type { ComponentProps, PropsWithChildren } from "react";
import { getButtonClassName, type ButtonVariant } from "./button-styles";

type ButtonLinkProps = PropsWithChildren<
    ComponentProps<typeof Link> & {
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
