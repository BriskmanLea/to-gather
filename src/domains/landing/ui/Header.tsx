import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ButtonLink, Container, LanguageSwitcher } from "@/shared/ui";

export async function Header() {
    const t = await getTranslations("Landing.header");
    const tCommon = await getTranslations("Common");

    const navigationItems = [
        {
            label: t("navFeatures"),
            href: "#features",
        },
        {
            label: t("navAbout"),
            href: "#about",
        },
    ];

    return (
        <header className="border-b border-neutral-400/60 bg-neutral-100">
            <Container className="flex items-center justify-between h-20">
                <a
                    href="#"
                    className="text-xl font-bold tracking-tight text-grey-800 focus-visible:outline-2 focus-visible:outline-primary-800 focus-visible:outline-offset-2"
                >
                    {tCommon("brand")}
                </a>

                <nav
                    className="hidden md:flex items-center gap-8"
                    aria-label={t("mainNavAriaLabel")}
                >
                    {navigationItems.map(item => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-grey-500 transition-colors hover:text-secondary-700 focus-visible:outline-2 focus-visible:outline-primary-800 focus-visible:outline-offset-2"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <LanguageSwitcher />

                    <Link
                        href="/sign-in"
                        className="hidden text-sm font-medium text-grey-500 hover:text-secondary-700 sm:block"
                    >
                        {t("signIn")}
                    </Link>

                    <ButtonLink href="/sign-up" className="px-4 py-2 text-sm">
                        {t("getStarted")}
                    </ButtonLink>
                </div>
            </Container>
        </header>
    );
}