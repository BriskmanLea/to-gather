import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";

const navigationItems = [
    {
        label: "Features",
        href: "#features",
    },
    {
        label: "About",
        href: "#about",
    },
];

export function Header() {
    return (
        <header className="border-b border-neutral-400/60 bg-neutral-100">
            <Container className="flex items-center justify-between h-20">
                <a
                    href="#"
                    className="text-xl font-bold tracking-tight text-grey-800 focus-visible:outline-2 focus-visible:outline-primary-800 focus-visible:outline-offset-2"
                >
                    ToGather
                </a>

                <nav
                    className="hidden md:flex items-center gap-8"
                    aria-label="Main navigation"
                >
                    {navigationItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-grey-500 transition-colors hover:text-secondary-700 focus-visible:outline-2 focus-visible:outline-primary-800 focus-visible:outline-offset-2"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <Button className="px-4 py-2 text-sm">Get started</Button>
            </Container>
        </header>
    );
}