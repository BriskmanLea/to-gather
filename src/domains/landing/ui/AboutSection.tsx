import { Container } from "@/shared/ui";

const benefits = [
    {
        number: "01",
        title: "Everything in one place",
        description: "Keep tasks, habits, goals, notes and personal reflections inside one connected workspace.",
    },
    {
        number: "02",
        title: "Only the tools you need",
        description: "Enable or disable modules and build a personal system that matches your lifestyle.",
    },
    {
        number: "03",
        title: "See your progress",
        description: "Track consistency, review important life areas and understand what needs your attention.",
    },
];

export function AboutSection() {
    return (
        <section id="about" className="bg-neutral-100 py-10">
            <Container>
                <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                    <div className="flex flex-col gap-4">
                        <p className="text-sm font-semibold uppercase tracking-widest text-secondary-700">
                            Why ToGather
                        </p>

                        <h2 className="text-3xl font-bold tracking-tight text-grey-800 md:text-5xl">
                            Your personal system should adapt to you
                        </h2>

                        <p className="max-w-xl text-lg leading-8 text-grey-500">
                            Productivity is not only about completing tasks. ToGather helps
                            you connect everyday planning with long-term goals, habits and
                            personal growth.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {benefits.map((benefit) => (
                            <article
                                key={benefit.number}
                                className="grid gap-4 p-6 rounded-3xl border border-neutral-400/50 bg-primary-100 sm:grid-cols-[auto_1fr]"
                            >
                                <span className="text-sm font-semibold text-primary-700">
                                    {benefit.number}
                                </span>

                                <div>
                                    <h3 className="text-xl font-semibold text-grey-800">
                                        {benefit.title}
                                    </h3>

                                    <p className="mt-2 leading-7 text-grey-500">
                                        {benefit.description}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}