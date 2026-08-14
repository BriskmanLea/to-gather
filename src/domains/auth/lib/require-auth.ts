import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { getIsAuthenticated } from "../model/auth";

export async function requireAuth() {
    const isAuthenticated = await getIsAuthenticated();

    if (!isAuthenticated) {
        const locale = await getLocale();
        redirect({ href: "/sign-in", locale });
    }
}
