"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "web-images";
const FOLDER = "about_carousel";

// Fallback: known filenames in case the dynamic list() call fails.
// Update this list if you rename existing files. New files added to Supabase
// will still be picked up automatically via the list() call below.
const FALLBACK_FILENAMES = [
    "about_carosel.jpeg",
    "about_carosel_1.jpg",
    "about_carosel_2.jpeg",
    "about_carosel_3.jpeg",
];

export default function AboutHeroCarousel() {
    const [images, setImages] = useState<string[]>([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

        if (!supabaseUrl || !supabaseKey) {
            console.warn("[AboutHeroCarousel] Missing Supabase env vars");
            return;
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        supabase.storage
            .from(BUCKET)
            .list(FOLDER, { sortBy: { column: "name", order: "asc" } })
            .then(({ data, error }) => {
                if (error) {
                    console.error("[AboutHeroCarousel] Supabase list error:", error.message);
                    // Fall back to known filenames
                    setImages(
                        FALLBACK_FILENAMES.map(
                            name => `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${FOLDER}/${name}`
                        )
                    );
                    return;
                }

                const files = (data ?? []).filter(
                    f => f.name && !f.name.startsWith(".")
                );

                if (files.length === 0) {
                    console.warn("[AboutHeroCarousel] No files found in folder, using fallback");
                    setImages(
                        FALLBACK_FILENAMES.map(
                            name => `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${FOLDER}/${name}`
                        )
                    );
                    return;
                }

                setImages(
                    files.map(
                        f => `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${FOLDER}/${f.name}`
                    )
                );
            });
    }, []);

    // Auto-advance
    useEffect(() => {
        if (images.length < 2) return;
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [images]);

    // While loading
    if (images.length === 0) return null;

    return (
        <>
            {images.map((src, i) => (
                <div
                    key={src}
                    className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                    style={{ opacity: i === current ? 1 : 0 }}
                >
                    <Image
                        src={src}
                        alt={`Meezan Educational Institute — about image ${i + 1}`}
                        fill
                        unoptimized
                        className="object-cover"
                        priority={i === 0}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            ))}
        </>
    );
}
