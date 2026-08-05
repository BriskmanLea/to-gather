"use client";

import { useEffect, useId, useRef, useState } from "react";

export type IconMenuItem = {
    label: string;
    onSelect: () => void;
    danger?: boolean;
};

type IconMenuProps = {
    label: string;
    items: IconMenuItem[];
};

export function IconMenu({ label, items }: IconMenuProps) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const menuId = useId();

    useEffect(() => {
        if (!open) return;

        function handlePointerDown(event: MouseEvent) {
            if (!rootRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    return (
        <div ref={rootRef} className="relative shrink-0">
            <button
                type="button"
                aria-label={label}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls={menuId}
                onClick={event => {
                    event.stopPropagation();
                    setOpen(current => !current);
                }}
                className="flex items-center justify-center size-9 rounded-xl text-grey-500 transition-colors cursor-pointer hover:bg-neutral-100 hover:text-grey-800"
            >
                <span aria-hidden="true" className="text-lg leading-none tracking-widest">
                    ⋯
                </span>
            </button>

            {open ? (
                <div
                    id={menuId}
                    role="menu"
                    className="absolute right-0 z-20 min-w-36 mt-1 py-1 overflow-hidden rounded-xl border border-neutral-400/60 bg-white shadow-lg shadow-neutral-700/10"
                >
                    {items.map(item => (
                        <button
                            key={item.label}
                            type="button"
                            role="menuitem"
                            onClick={event => {
                                event.stopPropagation();
                                setOpen(false);
                                item.onSelect();
                            }}
                            className={[
                                "block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-neutral-100 cursor-pointer",
                                item.danger ? "text-error hover:bg-error/10" : "text-grey-800"
                            ].join(" ")}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            ) : null}
        </div>
    );
}
