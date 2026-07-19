import Link from "next/link";
import type { CurrentUser } from "@/widgets/current-user";

type AppHeaderProps = {
    user: CurrentUser;
    onMenuOpen: () => void;
};

export function AppHeader({ user, onMenuOpen }: AppHeaderProps) {
    const { firstName, lastName } = user;
    const initials = `${firstName[0]}${lastName[0]}`;

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between h-20 border-b border-neutral-400/60 bg-neutral-100/90 px-4 backdrop-blur-sm lg:px-8">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onMenuOpen}
                    aria-label="Open navigation"
                    className="flex lg:hidden items-center justify-center rounded-xl border border-neutral-400 bg-white text-xl text-grey-800 transition-colors hover:border-secondary-500 size-10"
                >
                    ☰
                </button>

                <div>
                    <p className="text-sm text-grey-500">Personal workspace</p>

                    <p className="font-semibold text-grey-800">Home</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    type="button"
                    aria-label="Open notifications"
                    className="relative flex items-center justify-center rounded-full border border-neutral-400 bg-white text-grey-500 transition-colors hover:border-secondary-500 hover:text-secondary-700  size-10"
                >
                    {/* TODO: Add notification icon */}
                </button>

                <Link
                    href="/settings"
                    aria-label="Open profile settings"
                    className="flex items-center justify-center rounded-full bg-secondary-100 text-sm font-semibold text-secondary-800 transition-colors hover:bg-secondary-200 size-10"
                >
                    {/* TODO: Add profile icon */}
                    {initials}
                </Link>
            </div>
        </header>
    );
}