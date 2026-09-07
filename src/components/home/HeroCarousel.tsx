"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface HeroImage {
    src: string;
    alt: string;
    subtext?: string;
    badge?: string;
}

const HERO_IMAGES: HeroImage[] = [
    {
        src: "https://ihljjqopdutekhxrhyal.supabase.co/storage/v1/object/public/web-images/hero_carousel/Ftcci.jpg",
        alt: "Meezan Educational Institute - Proud Member of FTCCI",
        subtext: "🏛️ Meezan is now a proud member of FTCCI (Federation of Telangana Chambers of Commerce & Industry)",
        badge: "Official Announcement",
    },
    {
        src: "/carousels/home-carousel/hero_carosel_1.jpg",
        alt: "Meezan Educational Institute healthcare training class 1",
    },
    {
        src: "/carousels/home-carousel/hero_carosel_2.jpeg",
        alt: "Meezan Educational Institute healthcare training class 2",
    },
    {
        src: "/carousels/home-carousel/hero_carosel_3.jpeg",
        alt: "Meezan Educational Institute healthcare training class 3",
    },
];

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % HERO_IMAGES.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full lg:w-[45%] relative min-h-[50vh] lg:min-h-full">
            {HERO_IMAGES.map((img, i) => (
                <div
                    key={i}
                    className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                    style={{ opacity: i === current ? 1 : 0 }}
                >
                    <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover object-center"
                        priority={i === 0}
                        sizes="(max-width: 768px) 100vw, 45vw"
                    />
                    {img.subtext && (
                        <div className="absolute bottom-6 left-6 right-6 z-20 bg-brand-deeper-teal/85 backdrop-blur-md border border-white/20 p-3.5 sm:p-4 rounded-xl shadow-2xl text-white">
                            {img.badge && (
                                <span className="inline-block bg-brand-accent/20 text-brand-accent border border-brand-accent/30 text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full mb-1.5 uppercase tracking-wider">
                                    {img.badge}
                                </span>
                            )}
                            <p className="text-xs sm:text-sm font-medium leading-snug text-white/95">
                                {img.subtext}
                            </p>
                        </div>
                    )}
                </div>
            ))}
            {/* Gradient — mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deeper-teal via-transparent to-transparent lg:hidden z-10 pointer-events-none" />
            {/* Gradient — desktop left edge blend */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-deeper-teal via-transparent to-transparent hidden lg:block w-32 left-0 z-10 pointer-events-none" />
        </div>
    );
}
