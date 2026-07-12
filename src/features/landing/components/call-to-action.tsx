import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";

export function CallToAction() {
    return (
        <section className="bg-neutral-100 py-10">
            <Container>
                <div className="px-6 py-8 rounded-3xl border border-secondary-200 bg-secondary-100 text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-secondary-700">
                        Build your personal system
                    </p>

                    <h2 className="mx-auto mt-4 max-w-3xl text-3xl md:text-5xl font-bold tracking-tight text-grey-800">
                        Stop switching between multiple productivity apps
                    </h2>

                    <p className="max-w-2xl mx-auto mt-5 text-lg leading-8 text-grey-500 text-balance">
                        Choose your modules and keep your plans, progress and reflections in one connected workspace.
                    </p>

                    <Button className="mt-6">Create your workspace</Button>
                </div>
            </Container>
        </section>
    );
}