"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

type LanguageSwitcherProps = {
    className?: string;
};

export function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
    const t = useTranslations("Common");
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const labels: Record<AppLocale, string> = {
        en: t("english"),
        ru: t("russian"),
    };

    return (
        <div
            role="group"
            aria-label={t("language")}
            className={`inline-flex gap-1 rounded-xl bg-primary-100 p-1 ${className}`}
        >
            {routing.locales.map(item => {
                const isActive = item === locale;

                return (
                    <button
                        key={item}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => router.replace(pathname, { locale: item })}
                        className={[
                            "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer",
                            isActive
                                ? "bg-secondary-500 text-white shadow-sm"
                                : "text-grey-800 hover:bg-secondary-100",
                        ].join(" ")}
                    >
                        {labels[item]}
                    </button>
                );
            })}
        </div>
    );
}
