"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function StatsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const stats = [
        { value: 12500, suffix: "+", label: "Students Trained & Certified" },
        { value: 20, suffix: "+", label: "Courses Offered" },
        { value: 24, suffix: "+", label: "Years of Excellence" },
        { value: 90, suffix: "%", label: "Student Satisfaction" },
    ];

    return (
        <section ref={ref} className="w-full bg-brand-teal py-8 md:py-12" aria-label="Institute Statistics">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 text-center divide-x-0 lg:divide-x lg:divide-white/20">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="flex flex-col items-center px-4"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center relative">
                                <span className="relative z-10">
                                    {isInView ? (
                                        <CountUp end={stat.value} duration={2.5} useEasing />
                                    ) : (
                                        "0"
                                    )}
                                    <span className="text-brand-accent ml-0.5">{stat.suffix}</span>
                                </span>
                                {/* Subtle pulse animation behind numbers */}
                                <motion.span
                                    className="absolute inset-0 bg-white/20 rounded-full blur-xl -z-10"
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </div>
                            <p className="text-white/90 font-medium text-sm md:text-base">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
