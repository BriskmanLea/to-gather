"use client";

import { useState, type PropsWithChildren } from "react";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import type { CurrentUser } from "@/widgets/current-user";

type AppShellProps = PropsWithChildren<{
    user: CurrentUser;
}>;

export function AppShell({ children, user }: AppShellProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-neutral-100 lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
            <AppSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="min-w-0">
                <AppHeader onMenuOpen={() => setIsSidebarOpen(true)} user={user} />

                <main className="px-4 py-6 lg:px-8 lg:py-8">{children}</main>
            </div>
        </div>
    );
}