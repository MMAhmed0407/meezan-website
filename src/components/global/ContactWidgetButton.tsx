"use client";

import { ReactNode } from "react";

interface ContactWidgetButtonProps {
    children: ReactNode;
    className?: string;
}

export default function ContactWidgetButton({ children, className }: ContactWidgetButtonProps) {
    return (
        <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-contact-widget'))}
            className={className}
        >
            {children}
        </button>
    );
}
