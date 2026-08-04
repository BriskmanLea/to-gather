import { CalendarClock, List } from "lucide-react";
import { DAY_DISPLAY_MODES, type DayDisplayMode } from "../model";

const modeIcons = { list: List, schedule: CalendarClock } as const;

type Props = {
    value: DayDisplayMode;
    onChange: (value: DayDisplayMode) => void;
};

export function TasksDayModeToggle({ value, onChange }: Props) {
    return (
        <div
            className="inline-flex gap-1 rounded-xl bg-primary-100 p-1"
            role="group"
            aria-label="Day display mode"
        >
            {DAY_DISPLAY_MODES.map(mode => {
                const active = value === mode.value;
                const Icon = modeIcons[mode.value];

                return (
                    <button
                        key={mode.value}
                        type="button"
                        onClick={() => onChange(mode.value)}
                        aria-pressed={active}
                        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${active ? "bg-secondary-500 text-white shadow-sm" : "text-grey-800 hover:bg-secondary-100"}`}
                    >
                        <Icon className="size-4 shrink-0" aria-hidden />
                        {mode.label}
                    </button>
                );
            })}
        </div>
    );
}
