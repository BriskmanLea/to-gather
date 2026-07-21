import type { OverviewItem } from "../model/types";

type OverviewCardProps = {
    item: OverviewItem;
};

export function OverviewCard({ item }: OverviewCardProps) {
    return (
        <article className="p-5 rounded-3xl border border-neutral-400/50 bg-white shadow-sm shadow-neutral-700/5">
            <p className="text-sm font-medium text-grey-500">{item.label}</p>

            <p className="mt-3 text-3xl font-bold text-grey-800">{item.value}</p>

            <p className="mt-2 text-sm text-grey-500">{item.description}</p>
        </article>
    );
}