import { getTranslations } from "next-intl/server";
import { ButtonLink, Container } from "@/shared/ui";

export async function CallToAction() {
    const t = await getTranslations("Landing.cta");

    return (
        <section className="bg-neutral-100 py-10">
            <Container>
                <div className="px-6 py-8 rounded-3xl border border-secondary-200 bg-secondary-100 text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-secondary-700">
                        {t("eyebrow")}
                    </p>

                    <h2 className="mx-auto mt-4 max-w-3xl text-3xl md:text-5xl font-bold tracking-tight text-grey-800">
                        {t("title")}
                    </h2>

                    <p className="max-w-2xl mx-auto mt-5 text-lg leading-8 text-grey-500 text-balance">
                        {t("subtitle")}
                    </p>

                    <ButtonLink href="/sign-up" className="mt-6">
                        {t("button")}
                    </ButtonLink>
                </div>
            </Container>
        </section>
    );
}