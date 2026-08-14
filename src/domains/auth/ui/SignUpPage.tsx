import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SignUpForm } from "./SignUpForm";

export async function SignUpPage() {
    const t = await getTranslations("Auth.signUp");

    return (
        <>
            <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-secondary-700">
                    {t("eyebrow")}
                </p>

                <h1 className="mt-3 text-3xl font-bold text-grey-800">
                    {t("title")}
                </h1>

                <p className="mt-2 text-grey-500">
                    {t("subtitle")}
                </p>
            </div>

            <div className="mt-8">
                <SignUpForm />
            </div>

            <p className="flex items-center justify-center gap-1 mt-6 text-center text-sm text-grey-500">
                {t("hasAccount")}
                <Link
                    href="/sign-in"
                    className="font-semibold text-secondary-700 transition-colors hover:text-secondary-800"
                >
                    {t("signInLink")}
                </Link>
            </p>
        </>
    );
}
