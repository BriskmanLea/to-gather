import { getTranslations } from "next-intl/server";
import { ButtonLink, Container } from "@/shared/ui";
import { DashboardPreview } from "./DashboardPreview";

export async function HeroSection() {
    const t = await getTranslations("Landing.hero");

    return (
        <section className="overflow-hidden bg-neutral-100 py-10">
            <Container>
                <div className="grid items-center gap-8 lg:grid-cols-2">
                    <div className="flex flex-col gap-4">
                        <p className="text-sm font-semibold uppercase tracking-widest text-secondary-700">
                            {t("eyebrow")}
                        </p>

                        <h1 className="max-w-3xl text-5xl md:text-6xl lg:text-7xl font-bold text-grey-800 text-balance">
                            {t("title")}
                        </h1>

                        <p className="max-w-xl text-lg leading-8 text-grey-500 text-balance">
                            {t("subtitle")}
                        </p>

                        <ButtonLink href="/sign-up" className="w-full sm:w-fit">
                            {t("cta")}
                        </ButtonLink>
                    </div>

                    <DashboardPreview />
                </div>
            </Container>
        </section>
    );
}
