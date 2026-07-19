function getCurrentDate() {
    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    }).format(new Date());
}

function getGreeting() {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
        return "Good morning";
    }

    if (currentHour < 18) {
        return "Good afternoon";
    }

    return "Good evening";
}

type WelcomeProps = {
    firstName: string;
};

export function Welcome({ firstName }: WelcomeProps) {
    const currentDate = getCurrentDate();
    const greeting = getGreeting();

    return (
        <section>
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary-700">
                {currentDate}
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-grey-800 md:text-4xl">
                {greeting}, {firstName}
            </h1>

            <p className="mt-2 max-w-2xl text-grey-500">
                Here is an overview of your plans, habits and progress.
            </p>
        </section>
    );
}