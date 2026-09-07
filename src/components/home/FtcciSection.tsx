"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Building2, CheckCircle2, ShieldCheck } from "lucide-react";

export default function FtcciSection() {
    return (
        <section className="w-full bg-gradient-to-b from-brand-light to-white py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-y border-border/50 overflow-hidden" aria-label="FTCCI Membership Announcement">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ backgroundColor: "#0D7A82" }}
                    className="rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
                >
                    {/* Background decorative glow */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Image Container */}
                    <div className="w-full lg:w-1/2 relative shrink-0 rounded-2xl overflow-hidden shadow-xl border border-white/20 group bg-[#1f3684]">
                        <div className="aspect-[16/9] sm:aspect-[16/10] relative w-full overflow-hidden flex items-center justify-center p-2 sm:p-4">
                            <Image
                                src="/images/ftcci_membership.jpg"
                                alt="Meezan Educational Institute - Proud Member of FTCCI"
                                fill
                                className="object-contain object-center group-hover:scale-[1.02] transition-transform duration-500"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center relative z-10">
                        <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full w-fit mb-4 uppercase tracking-widest">
                            <Award size={15} className="text-white" />
                            <span className="text-white">Official Recognition</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
                            Proud Member of FTCCI
                        </h2>

                        <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-6">
                            Meezan Educational Institute is officially affiliated with the <strong className="text-white font-semibold">Federation of Telangana Chambers of Commerce & Industry (FTCCI)</strong>. This milestone strengthens our industry linkages and quality benchmarks across all our training programs.
                        </p>

                        {/* Features / Highlights */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-white/95">
                            {[
                                "State-Level Industry Recognition",
                                "Standardized Professional Training",
                                "Empowering Telangana's Workforce"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-2.5 bg-white/10 border border-white/15 px-3.5 py-2.5 rounded-xl">
                                    <CheckCircle2 size={16} className="text-white shrink-0" />
                                    <span className="font-medium text-xs sm:text-sm text-white">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
