import { ButtonLink } from "@/shared/ui/button-link";
import { Container } from "@/shared/ui/container";
import { DashboardPreview } from "./dashboard-preview";

export function HeroSection() {
    return (
        <section className="overflow-hidden bg-neutral-100 py-10">
            <Container>
                <div className="grid items-center gap-8 lg:grid-cols-2">
                    <div className="flex flex-col gap-4">
                        <p className="text-sm font-semibold uppercase tracking-widest text-secondary-700">
                            Personal life operating system
                        </p>

                        <h1 className="max-w-3xl text-5xl md:text-6xl lg:text-7xl font-bold text-grey-800 text-balance">
                            Plan, track and improve your life in one place
                        </h1>

                        <p className="max-w-xl text-lg leading-8 text-grey-500 text-balance">
                            Organize your tasks, goals, notes, habits and personal progress through one customizable workspace.
                        </p>

                        <ButtonLink href="/sign-up" className="w-full sm:w-fit">Start planning</ButtonLink>
                    </div>

                    <DashboardPreview />
                </div>
            </Container>
        </section>
    );
}