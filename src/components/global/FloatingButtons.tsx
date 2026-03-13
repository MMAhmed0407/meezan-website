"use client";

import { MessageCircle, Mail } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function FloatingButtons() {
    const triggerContactWidget = () => {
        window.dispatchEvent(new CustomEvent("open-contact-widget"));
    };

    const containerVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.5
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-4"
        >
            {/* WhatsApp Button */}
            <motion.a
                variants={itemVariants}
                href="https://wa.me/917730019572"
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp"
                className="w-12 h-12 md:w-[52px] md:h-[52px] min-w-[48px] min-h-[48px] bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center flex-shrink-0 group"
                aria-label="Chat with us on WhatsApp"
            >
                <MessageCircle size={28} className="md:w-8 md:h-8" />
                <span className="absolute right-full mr-4 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
                    Chat on WhatsApp
                </span>
            </motion.a>

            {/* Get in Touch Button */}
            <motion.button
                variants={itemVariants}
                onClick={triggerContactWidget}
                title="Get in Touch"
                className={clsx(
                    "h-12 md:h-[52px] min-w-[48px] min-h-[48px] bg-brand-teal text-white rounded-full shadow-lg hover:shadow-xl hover:bg-brand-dark-teal hover:-translate-y-1 transition-all duration-300 flex items-center justify-center flex-shrink-0 group",
                    "px-0 md:px-5" // Icon-only on mobile, pill on desktop
                )}
                aria-label="Open contact form"
            >
                <Mail size={24} className="md:w-6 md:h-6" />
                <span className="font-semibold text-sm whitespace-nowrap hidden md:block ml-2 overflow-hidden">
                    Get in Touch
                </span>
            </motion.button>
        </motion.div>
    );
}
