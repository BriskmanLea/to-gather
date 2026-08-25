import { getFormatter, getTranslations } from "next-intl/server";

function getGreetingKey() {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
        return "greetingMorning" as const;
    }

    if (currentHour < 18) {
        return "greetingAfternoon" as const;
    }

    return "greetingEvening" as const;
}

type WelcomeProps = {
    firstName: string;
};

export async function Welcome({ firstName }: WelcomeProps) {
    const t = await getTranslations("Home");
    const format = await getFormatter();
    const currentDate = format.dateTime(new Date(), {
        weekday: "long",
        month: "long",
        day: "numeric",
    });
    const greeting = t(getGreetingKey());

    return (
        <section>
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary-700">
                {currentDate}
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-grey-800 md:text-4xl">
                {t("greetingWithName", { greeting, firstName })}
            </h1>

            <p className="mt-2 max-w-2xl text-grey-500">
                {t("subtitle")}
            </p>
        </section>
    );
}