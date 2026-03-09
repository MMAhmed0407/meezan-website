"use client";

import { MessageCircle, Phone } from "lucide-react";

export default function FloatingElements() {
    return (
        <>
            <a
                href="https://wa.me/917730019572"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-20 md:bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 group"
                aria-label="Chat with us on WhatsApp"
            >
                <MessageCircle size={28} />
                <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Chat with us on WhatsApp
                </span>
            </a>

            {/* Mobile only call button */}
            <a
                href="tel:+919010186447"
                className="fixed bottom-20 left-6 z-50 bg-brand-teal text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 md:hidden flex items-center justify-center"
                aria-label="Call Now"
            >
                <Phone size={24} />
            </a>
        </>
    );
}
