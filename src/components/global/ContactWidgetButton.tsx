"use client";

import { ReactNode } from "react";
import posthog from "posthog-js";

interface ContactWidgetButtonProps {
    children: ReactNode;
    className?: string;
    courseName?: string;
}

export default function ContactWidgetButton({ children, className, courseName }: ContactWidgetButtonProps) {
    return (
        <button
            type="button"
            onClick={() => {
                posthog.capture('enquire_now_clicked', { course_name: courseName ?? null });
                window.dispatchEvent(new CustomEvent('open-contact-widget', { detail: { course: courseName } }));
            }}
            className={className}
        >
            {children}
        </button>
    );
}
