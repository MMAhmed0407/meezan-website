"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const ABOUT_IMAGES = [
    "/carousels/about-carousel/about_carosel_1.jpg",
    "/carousels/about-carousel/about_carosel.jpeg",
    "/carousels/about-carousel/about_carosel_2.jpeg",
    "/carousels/about-carousel/about_carosel_3.jpeg",
];

export default function AboutHeroCarousel() {
    const [current, setCurrent] = useState(0);

    // Auto-advance
    useEffect(() => {
        if (ABOUT_IMAGES.length < 2) return;
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % ABOUT_IMAGES.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {ABOUT_IMAGES.map((src, i) => (
                <div
                    key={src}
                    className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                    style={{ opacity: i === current ? 1 : 0 }}
                >
                    <Image
                        src={src}
                        alt={`Meezan Educational Institute — about image ${i + 1}`}
                        fill
                        className="object-cover"
                        priority={i === 0}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            ))}
        </>
    );
}
