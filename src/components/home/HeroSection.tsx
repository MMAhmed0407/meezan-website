"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

const HERO_IMAGES = [
    {
        src: `${SUPABASE_URL}/storage/v1/object/public/web-images/hero_carousel/hero_carosel_1.jpg`,
        alt: "Meezan Educational Institute healthcare training class 1",
    },
    {
        src: `${SUPABASE_URL}/storage/v1/object/public/web-images/hero_carousel/hero_carosel_2.jpeg`,
        alt: "Meezan Educational Institute healthcare training class 2",
    },
    {
        src: `${SUPABASE_URL}/storage/v1/object/public/web-images/hero_carousel/hero_carosel_3.jpeg`,
        alt: "Meezan Educational Institute healthcare training class 3",
    },
];

export default function HeroSection() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % HERO_IMAGES.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section className="relative min-h-[70vh] flex flex-col lg:flex-row w-full overflow-hidden bg-brand-deeper-teal">
            {/* Left Content */}
            <div className="w-full lg:w-[55%] relative flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-6 lg:py-0 z-10">
                {/* Subtle diagonal pattern overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}
                />

                <motion.div
                    className="relative z-10 max-w-2xl"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="mb-4 inline-block">
                        <span className="text-brand-accent uppercase tracking-widest text-[10px] sm:text-xs font-semibold border border-brand-accent/30 bg-brand-accent/10 px-4 py-1.5 rounded-full whitespace-nowrap">
                            <span className="sm:hidden">Premier Training Institute</span>
                            <span className="hidden sm:inline">Hyderabad&apos;s Premier Training Institute</span>
                        </span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-6">
                        Healthcare &amp; Coaching Training Institute in Hyderabad
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed mb-6 max-w-xl">
                        Encourage to Educate to Empower — From paramedical sciences to personality development and teacher&apos;s training, building careers and transforming lives.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-6">
                        <Link
                            href="/courses"
                            className="bg-brand-teal text-white px-8 py-4 rounded-full font-semibold text-center hover:bg-brand-dark-teal transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto"
                        >
                            Explore Courses
                        </Link>
                        <Link
                            href="/#contact"
                            className="px-8 py-4 rounded-full font-semibold text-center border-2 border-white text-white hover:bg-white hover:text-brand-deeper-teal transition-all duration-200 w-full sm:w-auto"
                        >
                            Book Free Consultation
                        </Link>
                    </motion.div>

                    {/* Trust Row */}
                    <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/90">
                        {[
                            "12500+ Lives Changed",
                            "20+ Courses",
                            "Expert Faculty",
                            "Job-Focused Training"
                        ].map(text => (
                            <div key={text} className="flex items-center gap-1.5">
                                <CheckCircle2 size={16} className="text-[#25D366]" />
                                <span>{text}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Right Carousel — no controls, auto-crossfade every 4s */}
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
                            unoptimized
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
        </section>
    );
}
