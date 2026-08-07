export type NavigationItem = {
    label: string;
    href: string;
};

export const mainNavigation: NavigationItem[] = [
    {
        label: "Home",
        href: "/home",
    },
    {
        label: "Today",
        href: "/today",
    },
    {
        label: "Tasks",
        href: "/tasks",
    },
    {
        label: "Habits",
        href: "/habits",
    },
    {
        label: "Goals",
        href: "/goals",
    },
    {
        label: "Notes",
        href: "/notes",
    },
    {
        label: "Finance",
        href: "/finance",
    },
];

export const secondaryNavigation: NavigationItem[] = [
    {
        label: "Settings",
        href: "/settings",
    },
];