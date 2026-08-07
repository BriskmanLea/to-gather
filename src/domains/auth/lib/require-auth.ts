import { redirect } from "next/navigation";
import { getIsAuthenticated } from "../model/auth";

export async function requireAuth() {
    const isAuthenticated = await getIsAuthenticated();

    if (!isAuthenticated) {
        redirect("/sign-in");
    }
}