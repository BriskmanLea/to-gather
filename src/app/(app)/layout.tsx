import type { PropsWithChildren } from "react";
import { requireAuth } from "@/entities/session";
import { AppShell } from "@/widgets/app-shell";
import { getCurrentUser } from "@/widgets/current-user";

export default async function AppLayout({ children }: PropsWithChildren) {
    await requireAuth();

    const user = await getCurrentUser();

    return (
        <AppShell user={user}>
            {children}
        </AppShell>
    );
}