import Link from "next/link";
import type { ReactNode } from "react";

type AuthLayoutProps = {
    children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <main className="relative flex items-center justify-center min-h-screen px-4 py-10 overflow-hidden bg-neutral-100">
            <div
                aria-hidden="true"
                className="absolute -left-24 -top-24 size-72 rounded-full bg-primary-200/60 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="absolute -bottom-24 -right-24 size-72 rounded-full bg-secondary-200/60 blur-3xl"
            />

            <div className="relative w-full max-w-md">
                <Link
                    href="/"
                    className="inline-block mb-6 text-xl font-bold tracking-tight text-grey-800 transition-colors hover:text-secondary-700"
                >
                    ToGather
                </Link>

                <section className="p-6 rounded-3xl border border-neutral-400/50 bg-white/80 shadow-xl shadow-neutral-700/10 backdrop-blur-sm">
                    {children}
                </section>
            </div>
        </main>
    );
}