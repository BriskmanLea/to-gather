import type { PropsWithChildren } from "react";
import { AppShell } from "@/widgets/app-shell";
import { getCurrentUser } from "@/widgets/current-user";

export default async function AppLayout({ children }: PropsWithChildren) {
    const user = await getCurrentUser();

    return (
        <AppShell user={user}>
            {children}
        </AppShell>
    );
}