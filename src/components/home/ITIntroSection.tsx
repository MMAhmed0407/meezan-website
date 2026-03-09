"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart3, Bot, PieChart, LayoutDashboard } from "lucide-react";

export default function ITIntroSection() {
    return (
        <section className="relative py-24 bg-brand-deeper-teal overflow-hidden">
            {/* Background Grid Pattern */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deeper-teal via-transparent to-brand-deeper-teal" />

            <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-16">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="w-full lg:w-1/2"
                >
                    <div className="inline-block bg-brand-teal/20 border border-brand-teal/30 px-4 py-1.5 rounded-full mb-6 text-brand-teal text-sm font-semibold uppercase tracking-wider">
                        Powered by TurnkeyBS
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-[52px] font-bold text-white leading-tight mb-6">
                        Transform Your Career with Technology
                    </h2>
                    <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-xl">
                        We offer structured, industry-aligned IT courses covering AI, Data Science, Power BI and more — specially designed to make you job-ready in today's competitive market in association with Turnkey Business Solutions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/courses#it-long"
                            className="bg-brand-teal text-white px-8 py-3.5 rounded-full text-center font-semibold hover:bg-brand-dark-teal transition-colors shadow-lg shadow-brand-teal/20 hover:shadow-xl hover:-translate-y-0.5"
                        >
                            View All IT Courses
                        </Link>
                        <Link
                            href="/#contact"
                            className="px-8 py-3.5 rounded-full font-semibold text-center border-2 border-white/50 text-white hover:bg-white hover:text-brand-deeper-teal transition-all"
                        >
                            Book a Free Demo Class
                        </Link>
                    </div>
                </motion.div>

                {/* Right Feature Grid */}
                <div className="w-full lg:w-1/2">
                    <div className="grid grid-cols-2 gap-4 sm:gap-6">
                        {[
                            { title: "Data Analytics", icon: BarChart3 },
                            { title: "AI & Machine Learning", icon: Bot },
                            { title: "Power BI + AI", icon: PieChart },
                            { title: "Project Management", icon: LayoutDashboard },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl hover:bg-white/10 transition-colors group flex flex-col items-center text-center justify-center min-h-[180px]"
                            >
                                <div className="bg-brand-accent/10 p-4 rounded-xl mb-4 group-hover:scale-110 group-hover:bg-brand-accent/20 transition-all duration-300">
                                    <item.icon size={32} className="text-brand-accent" />
                                </div>
                                <h3 className="text-white text-base sm:text-lg font-medium">{item.title}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
