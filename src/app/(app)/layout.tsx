import type { PropsWithChildren } from "react";
import { AppShell } from "@/widgets/app-shell";
import { getCurrentUser } from "@/widgets/current-user";

type AppLayoutProps = PropsWithChildren;

const user = await getCurrentUser();

export default function AppLayout({ children }: AppLayoutProps) {
    return <AppShell user={user}>{children}</AppShell>;
}