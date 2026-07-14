export type ButtonVariant = "primary" | "secondary";

export const buttonBaseStyles = "inline-flex items-center justify-center cursor-pointer rounded-full px-6 py-3 font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

export const buttonVariantStyles: Record<ButtonVariant, string> = {
    primary: "bg-primary-500 text-grey-800 hover:bg-primary-700 hover:text-white",
    secondary: "border border-secondary-500 bg-secondary-100 text-secondary-800 hover:bg-secondary-200",
};

export function getButtonClassName(variant: ButtonVariant = "primary", className = "") {
    return [
        buttonBaseStyles,
        buttonVariantStyles[variant],
        className,
    ].filter(Boolean).join(" ");
}