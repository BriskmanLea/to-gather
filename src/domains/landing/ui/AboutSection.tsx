import { getTranslations } from "next-intl/server";
import { Container } from "@/shared/ui";

const benefits = [
    {
        number: "01",
        id: "everythingInOnePlace",
    },
    {
        number: "02",
        id: "onlyToolsYouNeed",
    },
    {
        number: "03",
        id: "seeYourProgress",
    },
] as const;

export async function AboutSection() {
    const t = await getTranslations("Landing.about");

    return (
        <section id="about" className="bg-neutral-100 py-10">
            <Container>
                <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                    <div className="flex flex-col gap-4">
                        <p className="text-sm font-semibold uppercase tracking-widest text-secondary-700">
                            {t("eyebrow")}
                        </p>

                        <h2 className="text-3xl font-bold tracking-tight text-grey-800 md:text-5xl">
                            {t("title")}
                        </h2>

                        <p className="max-w-xl text-lg leading-8 text-grey-500">
                            {t("subtitle")}
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
                                        {t(`${benefit.id}.title`)}
                                    </h3>

                                    <p className="mt-2 leading-7 text-grey-500">
                                        {t(`${benefit.id}.description`)}
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
