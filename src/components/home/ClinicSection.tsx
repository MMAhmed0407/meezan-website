"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, CheckCircle } from "lucide-react";

export default function ClinicSection() {
    return (
        <section className="relative py-6 md:py-8 lg:py-10 bg-gradient-to-br from-brand-deeper-teal to-[#1a1a2e] overflow-hidden" aria-labelledby="clinic-heading">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-accent/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-8">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="w-full lg:w-3/5 text-white"
                >
                    <div className="w-16 h-1 bg-brand-accent mb-8 rounded-full" />
                    <h2 id="clinic-heading" className="text-white mb-3 text-4xl lg:text-5xl">Shoukath Ali Charitable Clinic</h2>
                    <p className="text-brand-accent text-lg font-medium mb-4 md:mb-6 tracking-wide uppercase text-sm">
                        A Humanitarian Initiative of Meezan Paramedic Institute
                    </p>

                    <blockquote className="text-xl lg:text-2xl font-light italic leading-relaxed mb-6 md:mb-8 border-l-4 border-brand-teal pl-6 py-2">
                        "Your health is our priority. We provide comprehensive psychological assessments and nursing care precisely when and where you need it."
                    </blockquote>

                    <div className="flex flex-wrap gap-4 mb-6">
                        {["Compassionate Care", "Community First", "Accessible Healthcare"].map((pill) => (
                            <span key={pill} className="bg-white/10 border border-white/20 px-5 py-2 rounded-full text-sm font-medium backdrop-blur-sm flex items-center gap-2">
                                <CheckCircle size={14} className="text-brand-accent" />
                                {pill}
                            </span>
                        ))}
                    </div>

                    <address className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 backdrop-blur-sm not-italic">
                        <h3 className="text-white text-xl mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                            <Phone className="text-brand-teal" /> Contact & Appointments
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="not-italic">
                                <p className="text-white/60 text-sm mb-1">Helpline Numbers</p>
                                <p className="font-semibold text-lg hover:text-brand-accent transition-colors"><a href="tel:+918897594925" aria-label="Call 8897594925">8897594925</a></p>
                                <p className="font-semibold text-lg hover:text-brand-accent transition-colors"><a href="tel:04045131341" aria-label="Call 040-45131341">040-45131341</a></p>
                            </div>
                            <div className="not-italic">
                                <p className="text-white/60 text-sm mb-1">Clinic Credentials</p>
                                <p className="font-medium text-sm leading-relaxed text-white/90">
                                    M.sc Clinical Psychology | M.sc Child Psychology | M.sc Nursing Psychology | NNF
                                </p>
                            </div>
                        </div>
                    </address>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full lg:w-2/5"
                >
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                        <Image
                            src="https://images.unsplash.com/photo-1542884748-2b87b00f3652?auto=format&fit=crop&q=80"
                            alt="Community healthcare clinic"
                            fill
                            className="object-cover"
                            loading="lazy"
                        />
                        {/* Subtle inner shadow overlay */}
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
