import Link from "next/link";
import type { CurrentUser } from "@/widgets/current-user";

type AppHeaderProps = {
    user: CurrentUser;
    onMenuOpen: () => void;
};

function getInitials(user: CurrentUser) {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
}

export function AppHeader({ user, onMenuOpen }: AppHeaderProps) {
    const initials = getInitials(user);

    return (
        <header className="flex items-center justify-between h-16 px-4 lg:px-8 border-b border-neutral-300 bg-white">
            <button
                type="button"
                onClick={onMenuOpen}
                aria-label="Open navigation"
                className="p-2 rounded-xl text-grey-700 transition-colors hover:bg-neutral-100 lg:hidden"
            >
                ☰
            </button>

            <div className="flex items-center gap-3 ml-auto">
                <Link
                    href="/notifications"
                    aria-label="Notifications"
                    className="p-2 rounded-xl text-grey-600 transition-colors hover:bg-neutral-100"
                >
                    🔔
                </Link>

                <Link
                    href="/profile"
                    aria-label="Profile"
                    className="flex items-center gap-3 p-1.5 rounded-xl transition-colors hover:bg-neutral-100"
                >
                    <span className="flex items-center justify-center size-9 rounded-full bg-secondary-500 text-sm font-semibold text-white">
                        {initials}
                    </span>

                    <span className="hidden text-left sm:block">
                        <span className="block text-sm font-semibold text-grey-800">
                            {user.firstName} {user.lastName}
                        </span>

                        <span className="block text-xs text-grey-500">
                            {user.email}
                        </span>
                    </span>
                </Link>
            </div>
        </header>
    );
}