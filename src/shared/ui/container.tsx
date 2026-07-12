import type { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<{
    className?: string;
}>;

export function Container({ children, className = "" }: ContainerProps) {
    return (
        <div className={`w-full max-w-5xl mx-auto px-4 ${className}`}>
            {children}
        </div>
    );
}