"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation, secondaryNavigation, type NavigationItem } from "../model/navigation";

type AppSidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

function isNavigationItemActive(pathname: string, href: string) {
    if (href === "/home") {
        return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
}

type NavigationLinkProps = {
    item: NavigationItem;
    pathname: string;
    onClick?: () => void;
};

function NavigationLink({
    item,
    pathname,
    onClick,
}: NavigationLinkProps) {
    const isActive = isNavigationItemActive(pathname, item.href);

    return (
        <Link
            href={item.href}
            onClick={onClick}
            aria-current={isActive ? "page" : undefined}
            className={[
                "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                isActive ? "bg-secondary-100 text-secondary-800" : "text-grey-500 hover:bg-white/70 hover:text-grey-800"
            ].join(" ")}
        >
            {item.label}
        </Link>
    );
}

type SidebarContentProps = {
    pathname: string;
    onNavigate?: () => void;
};

function SidebarContent({ pathname, onNavigate }: SidebarContentProps) {
    return (
        <>
            <div className="flex items-center h-20 px-6 border-b border-neutral-400/60">
                <Link
                    href="/home"
                    onClick={onNavigate}
                    className="text-xl font-bold tracking-tight text-grey-800"
                >
                    ToGather
                </Link>
            </div>

            <nav
                aria-label="Main application navigation"
                className="flex flex-col gap-1 flex-1 p-4"
            >
                {mainNavigation.map((item) => (
                    <NavigationLink
                        key={item.href}
                        item={item}
                        pathname={pathname}
                        onClick={onNavigate}
                    />
                ))}
            </nav>

            <nav
                aria-label="Secondary application navigation"
                className="border-t border-neutral-400/60 p-4"
            >
                {secondaryNavigation.map((item) => (
                    <NavigationLink
                        key={item.href}
                        item={item}
                        pathname={pathname}
                        onClick={onNavigate}
                    />
                ))}
            </nav>
        </>
    );
}

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
    const pathname = usePathname();

    return (
        <>
            <aside className="hidden lg:flex lg:flex-col min-h-screen border-r border-neutral-400/60 bg-primary-100">
                <SidebarContent pathname={pathname} />
            </aside>

            {isOpen ? (
                <div className="fixed lg:hidden inset-0 z-50">
                    <button
                        type="button"
                        aria-label="Close navigation"
                        onClick={onClose}
                        className="absolute inset-0 bg-grey-800/30"
                    />

                    <aside className="relative flex flex-col h-full w-72 border-r border-neutral-400/60 bg-primary-100 shadow-xl">
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close navigation"
                            className="absolute right-4 top-5 flex items-center justify-center size-10 rounded-full text-xl text-grey-500 transition-colors hover:bg-white/70 hover:text-grey-800"
                        >
                            ×
                        </button>

                        <SidebarContent
                            pathname={pathname}
                            onNavigate={onClose}
                        />
                    </aside>
                </div>
            ) : null}
        </>
    );
}