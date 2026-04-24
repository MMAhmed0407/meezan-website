"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const HERO_IMAGES = [
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
                </div>
            ))}
            {/* Gradient — mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deeper-teal via-transparent to-transparent lg:hidden z-10" />
            {/* Gradient — desktop left edge blend */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-deeper-teal via-transparent to-transparent hidden lg:block w-32 left-0 z-10" />
        </div>
    );
}
