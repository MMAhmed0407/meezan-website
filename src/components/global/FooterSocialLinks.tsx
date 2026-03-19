"use client";

import { useState, useRef, useEffect } from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function FooterSocialLinks() {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleComingSoon = (e: React.MouseEvent, platform: string) => {
        e.preventDefault();
        setToastMessage(`We're coming to ${platform} soon! Stay tuned.`);
        
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
            setToastMessage(null);
        }, 3000);
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="relative flex flex-col items-start w-full">
            <div className="flex gap-4">
                <button 
                    onClick={(e) => handleComingSoon(e, "Facebook")} 
                    className="bg-white/10 p-2 rounded-full transition-colors opacity-70 cursor-default hover:bg-white/20 z-10" 
                    aria-label="Facebook"
                    type="button"
                >
                    <Facebook size={20} />
                </button>
                <a 
                    href="https://instagram.com/meezaninstitute" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-white/10 p-2 rounded-full hover:bg-brand-teal transition-colors z-10 relative" 
                    aria-label="Instagram"
                >
                    <Instagram size={20} />
                </a>
                <button 
                    onClick={(e) => handleComingSoon(e, "LinkedIn")} 
                    className="bg-white/10 p-2 rounded-full transition-colors opacity-70 cursor-default hover:bg-white/20 z-10" 
                    aria-label="LinkedIn"
                    type="button"
                >
                    <Linkedin size={20} />
                </button>
                <button 
                    onClick={(e) => handleComingSoon(e, "Twitter")} 
                    className="bg-white/10 p-2 rounded-full transition-colors opacity-70 cursor-default hover:bg-white/20 z-10" 
                    aria-label="Twitter"
                    type="button"
                >
                    <Twitter size={20} />
                </button>
            </div>

            {/* Toast Message */}
            <div 
                className={`mt-4 absolute top-full left-0 bg-brand-dark-teal/95 backdrop-blur-md border border-white/20 text-white text-sm px-4 py-2.5 rounded-lg shadow-xl pointer-events-none transition-all duration-500 ease-in-out z-20 w-max max-w-[280px] origin-top ${toastMessage ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2'}`}
                aria-live="polite"
            >
                {toastMessage}
            </div>
        </div>
    );
}
