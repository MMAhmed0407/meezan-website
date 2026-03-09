"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function HeroSection() {
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
        <section className="relative min-h-[90vh] flex flex-col lg:flex-row w-full overflow-hidden bg-brand-deeper-teal">
            {/* Left Content */}
            <div className="w-full lg:w-[55%] relative flex flex-col justify-center px-6 lg:px-16 py-20 lg:py-0 z-10">
                {/* Subtle diagonal pattern overlay - using CSS gradient */}
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
                        <span className="text-brand-accent uppercase tracking-widest text-sm font-semibold border border-brand-accent/30 bg-brand-accent/10 px-4 py-1.5 rounded-full">
                            Hyderabad's Premier Training Institute
                        </span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-6">
                        Encourage to Educate to Empower
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-base md:text-lg text-white/80 leading-relaxed mb-10 max-w-xl">
                        From paramedical sciences to personality development and cutting-edge IT skills — Meezan Educational Institute is where careers are built and lives are transformed.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-12">
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
                            "500+ Students Enrolled",
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

            {/* Right Image */}
            <div className="w-full lg:w-[45%] relative min-h-[50vh] lg:min-h-full">
                <motion.div
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80"
                        alt="Confident mentor conducting a class at Meezan Educational Institute"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    {/* Gradient transition for mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-deeper-teal via-transparent to-transparent lg:hidden" />
                    {/* Gradient transition for desktop */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-deeper-teal via-transparent to-transparent hidden lg:block w-32 left-0" />
                </motion.div>
            </div>
        </section>
    );
}
