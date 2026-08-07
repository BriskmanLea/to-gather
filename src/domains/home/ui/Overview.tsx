import type { OverviewItem } from "../model/types";
import { OverviewCard } from "./OverviewCard";

type OverviewProps = {
    items: OverviewItem[];
};

export function Overview({ items }: OverviewProps) {
    return (
        <section
            aria-label="Daily overview"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mt-8"
        >
            {items.map((item) => (
                <OverviewCard
                    key={item.label}
                    item={item}
                />
            ))}
        </section>
    );
}