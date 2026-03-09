"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const announcements = [
    "🎓 New Batch Starting Soon — Register Now",
    "📞 Free Consultation Available — Call 9010186447",
    "🏥 Shoukath Ali Charitable Clinic — Healthcare at Your Doorstep",
];

export default function AnnouncementBar() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!isVisible) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % announcements.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="bg-brand-deeper-teal text-white text-[10px] sm:text-xs md:text-sm py-2 px-4 relative flex items-center justify-center min-h-[40px] z-50">
            <AnimatePresence mode="wait">
                <motion.p
                    key={currentIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="text-center w-full max-w-[90%] font-medium tracking-wide"
                >
                    {announcements[currentIndex]}
                </motion.p>
            </AnimatePresence>
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-75 transition-opacity"
                aria-label="Close announcement"
            >
                <X size={16} />
            </button>
        </div>
    );
}
