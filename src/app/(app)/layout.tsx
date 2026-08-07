import type { PropsWithChildren } from "react";
import { requireAuth } from "@/domains/auth";
import { AppShell } from "@/domains/shell";
import { getCurrentUser } from "@/domains/user";

export default async function AppLayout({ children }: PropsWithChildren) {
    await requireAuth();

    const user = await getCurrentUser();

    return (
        <AppShell user={user}>
            {children}
        </AppShell>
    );
}