"use client";

import { type ReactNode, useEffect } from "react";

type ModalProps = {
    open: boolean;
    title?: string;
    children: ReactNode;
    onClose: () => void;
    footer?: ReactNode;
};

export function Modal({ open, title, children, onClose, footer }: ModalProps) {
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    useEffect(() => {
        if (open) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-primary-100">
                    {title && (
                        <h2 className="text-xl font-semibold text-grey-800">
                            {title}
                        </h2>
                    )}

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex items-center justify-center h-9 w-9 rounded-lg text-grey-500 transition-colors hover:bg-primary-100 hover:text-grey-800"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6">
                    {children}
                </div>

                {footer && (
                    <div className="flex justify-center gap-3 border-t border-primary-100 px-6 py-4">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}