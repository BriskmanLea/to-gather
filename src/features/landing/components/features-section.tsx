import { Container } from "@/shared/ui/container";
import { landingFeatures } from "../data/features";

export function FeaturesSection() {
    return (
        <section
            id="features"
            className="border-y border-neutral-400/50 bg-primary-100 py-10"
        >
            <Container>
                <div className="flex flex-col gap-4 max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-widest text-secondary-700">
                        Features
                    </p>

                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-grey-800">
                        Everything you need to organize your personal life
                    </h2>

                    <p className="text-lg leading-8 text-grey-500 text-balance">
                        Enable only the modules you need and create a workspace that matches your lifestyle.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
                    {landingFeatures.map((feature) => (
                        <article
                            key={feature.title}
                            className="rounded-3xl border border-primary-200 bg-neutral-100 p-6 transition duration-200 hover:-translate-y-1 hover:border-primary-500 hover:shadow-lg"
                        >
                            <span className="text-xs font-semibold uppercase tracking-wider text-secondary-700">
                                {feature.label}
                            </span>

                            <h3 className="mt-3 text-xl font-semibold text-grey-800">
                                {feature.title}
                            </h3>

                            <p className="mt-2 leading-7 text-grey-500">
                                {feature.description}
                            </p>
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    );
}