import { Container } from "@/shared/ui/container";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-neutral-400/60 bg-primary-100 py-8">
            <Container className="flex flex-col gap-4 text-sm text-grey-500 sm:flex-row sm:items-center sm:justify-between">
                <p>© {currentYear} ToGather. Personal productivity workspace.</p>

                <div className="flex gap-5">
                    <a
                        href="#features"
                        className="transition-colors hover:text-secondary-700 focus-visible:outline-2 focus-visible:outline-primary-800 focus-visible:outline-offset-2"
                    >
                        Features
                    </a>

                    <a
                        href="https://github.com/BriskmanLea/to-gather"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-secondary-700 focus-visible:outline-2 focus-visible:outline-primary-800 focus-visible:outline-offset-2"
                    >
                        GitHub
                    </a>
                </div>
            </Container>
        </footer>
    );
}