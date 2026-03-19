"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, ClipboardList, Target, Eye, HeartHandshake, BadgeCheck } from "lucide-react";
import { BreadcrumbSchema } from "@/components/global/SchemaOrg";
import CommunityCarousel from "@/components/about/CommunityCarousel";
import AboutHeroCarousel from "@/components/about/AboutHeroCarousel";

export default function AboutPage() {
    const team = [
        { name: "Dr. Ayesha K.", role: "Principal Director", bio: "Leading Meezan Institute with 20+ years of educational excellence.", initials: "AK" },
        { name: "Mr. Mohammed S.", role: "Head of Paramedical Studies", bio: "Former chief nurse turned dedicated healthcare educator.", initials: "MS" },
        { name: "Ms. Sarah J.", role: "Head of Teacher's Training", bio: "Expert in early childhood education and pedagogical innovation.", initials: "SJ" }
    ];

    return (
        <div className="w-full overflow-hidden">
            <BreadcrumbSchema crumbs={[
                { name: 'Home', url: '/' },
                { name: 'About Us', url: '/about' }
            ]} />

            {/* HERO SECTION */}
            <section className="relative min-h-[70vh] flex flex-col lg:flex-row w-full bg-brand-deeper-teal">
                <div className="w-full lg:w-1/2 relative flex flex-col justify-center px-6 lg:px-16 py-20 lg:py-0 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-xl"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            About Meezan Educational Institute Hyderabad
                        </h1>
                        <p className="text-lg text-white/80 leading-relaxed border-l-4 border-brand-teal pl-4">
                            Encourage to Educate to Empower — Building careers, transforming lives, and serving communities since our founding in Hyderabad.
                        </p>
                    </motion.div>
                </div>
                <div className="w-full lg:w-1/2 relative min-h-[40vh] lg:min-h-full">
                    {/* Dynamic carousel — images fetched from Supabase Storage (web-images/about_carousel).
                        Add any image to that folder in Supabase and it auto-appears here. */}
                    <AboutHeroCarousel />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-deeper-teal via-transparent to-transparent lg:hidden z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-deeper-teal via-transparent to-transparent hidden lg:block w-32 left-0 z-10" />
                </div>
            </section>

            {/* STATS STRIP */}
            <section className="w-full py-6" style={{ backgroundColor: "#0D7A82" }}>
                <div className="max-w-7xl mx-auto px-4 flex flex-row justify-between divide-x divide-white/20">
                    <div className="flex-1 text-center px-2">
                        <div className="text-2xl sm:text-3xl font-bold text-white">12500+</div>
                        <div className="text-xs sm:text-sm text-white/75 mt-1">Students Certified</div>
                    </div>
                    <div className="flex-1 text-center px-2">
                        <div className="text-2xl sm:text-3xl font-bold text-white">20+</div>
                        <div className="text-xs sm:text-sm text-white/75 mt-1">Courses Offered</div>
                    </div>
                    <div className="flex-1 text-center px-2">
                        <div className="text-2xl sm:text-3xl font-bold text-white">24+</div>
                        <div className="text-xs sm:text-sm text-white/75 mt-1">Years of Service</div>
                    </div>
                </div>
            </section>

            {/* OUR STORY */}
            <section className="py-20 px-4 sm:px-8 lg:px-16" style={{ backgroundColor: "#F0FAFA" }} aria-labelledby="about-story-heading">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="w-full lg:w-1/2"
                    >
                        <h2 id="about-story-heading" className="mb-6 text-3xl lg:text-4xl">Our Story</h2>
                        <div className="space-y-6 text-foreground/80 leading-relaxed text-lg" style={{ borderLeft: "4px solid #29B8C1", paddingLeft: "24px" }}>
                            <p>
                                Meezan Educational Institute was founded with a singular mission — to empower individuals through quality education, professional training, and compassionate healthcare.
                            </p>
                            <p>
                                From paramedical sciences to personality development and teacher training, we bridge the gap between learning and real-world success. We believe that true education goes beyond textbooks to develop the whole person — equipping them with practical competencies and robust character.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* JOURNEY TIMELINE SECTION — TO BE ADDED */}

            {/* MISSION & VISION */}
            <section className="py-20 bg-brand-light" aria-label="Mission and Vision">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-brand-deeper-teal rounded-3xl p-10 lg:p-14 text-white shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/10 rounded-full blur-3xl group-hover:bg-brand-teal/20 transition-colors duration-500" />
                        <Target size={48} className="text-brand-accent mb-8" />
                        <h3 className="text-3xl text-white mb-6">Our Mission</h3>
                        <p className="text-lg text-white/80 leading-relaxed">
                            To provide accessible, high-quality education and training that transforms individuals and communities. We strive to be the catalyst for positive change in careers and lives.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-brand-deeper-teal rounded-3xl p-10 lg:p-14 text-white shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl group-hover:bg-brand-accent/20 transition-colors duration-500" />
                        <Eye size={48} className="text-brand-accent mb-8" />
                        <h3 className="text-3xl text-white mb-6">Our Vision</h3>
                        <p className="text-lg text-white/80 leading-relaxed">
                            To be Hyderabad's most trusted institution for paramedical, professional, and teacher education, continuously setting new benchmarks for academic excellence.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* WHY CHOOSE US - Mini Version */}
            <section className="py-20 bg-white" aria-labelledby="about-pillars-heading">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 id="about-pillars-heading" className="text-center mb-16 text-3xl">Our Core Pillars</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: GraduationCap,
                                title: "Expert Faculty",
                                desc: "Taught by experienced professionals with real-world backgrounds in healthcare, education and training."
                            },
                            {
                                icon: ClipboardList,
                                title: "Practical Training",
                                desc: "Hands-on learning that goes beyond theory — every course is designed around real workplace readiness."
                            },
                            {
                                icon: HeartHandshake,
                                title: "Holistic Growth",
                                desc: "We develop the whole person — skills, character, confidence and purpose — not just qualifications."
                            },
                            {
                                icon: BadgeCheck,
                                title: "Affordable Fees",
                                desc: "Quality education should be accessible to all. Many of our programmes are free or heavily subsidised."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className="flex flex-col items-center text-center p-6"
                            >
                                <div className="bg-brand-light p-6 rounded-full text-brand-teal mb-4">
                                    <item.icon size={40} strokeWidth={1.5} />
                                </div>
                                <h4 className="text-xl font-semibold text-brand-deeper-teal">{item.title}</h4>
                                <p style={{ fontSize: "14px", color: "#5A5A72", marginTop: "8px", textAlign: "center", maxWidth: "200px", lineHeight: 1.5 }}>
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CLINIC SECTION */}
            <section className="py-8 md:py-10 bg-white" aria-labelledby="about-clinic-heading">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 id="about-clinic-heading" className="mb-4 text-3xl md:text-4xl text-brand-teal">Shoukath Ali Charitable Clinic</h2>
                        <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-10">
                            Our Commitment to the Community
                        </p>
                        <div className="relative w-full rounded-xl flex flex-col items-center justify-center mb-12" style={{ backgroundColor: "#0D7A82", height: "320px", borderRadius: "12px" }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
                                <path d="M12 2v20M2 12h20" />
                            </svg>
                            <span style={{ color: "white", fontSize: "14px", opacity: 0.7 }}>Clinic photos coming soon</span>
                        </div>
                        <p className="text-xl leading-relaxed text-foreground/80 italic mb-8 border-l-4 border-r-4 border-brand-teal/20 px-6 max-w-4xl mx-auto">
                            "Empowering the underserved — striving to deliver compassionate healthcare, fostering healthy and happy communities, and contributing to a healthier India."
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <span className="bg-brand-light px-5 py-2 rounded-full font-medium text-brand-deeper-teal border border-border">Concise Delivery</span>
                            <span className="bg-brand-light px-5 py-2 rounded-full font-medium text-brand-deeper-teal border border-border">Compassionate Care</span>
                            <span className="bg-brand-light px-5 py-2 rounded-full font-medium text-brand-deeper-teal border border-border">Inspirational Results</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* JOURNEY TEASER SECTION */}
            <section className="bg-[#F4F6F9] py-12 px-4 sm:px-8 lg:px-16" aria-labelledby="journey-teaser-heading">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <p className="text-[#29B8C1] text-[13px] font-semibold tracking-widest uppercase mb-2">
                            WANT TO KNOW MORE?
                        </p>
                        <h2 id="journey-teaser-heading" className="text-[22px] font-bold text-[#1A1A2E] mb-3">
                            Our Journey & Leadership Team
                        </h2>
                        <p className="text-[14px] text-[#5A5A72] leading-relaxed">
                            Explore the story of how Meezan grew, meet our leadership team, and see the recognition we have received over the years.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href="/our-journey"
                            className="inline-flex items-center justify-center bg-[#29B8C1] text-white px-6 py-3 rounded-lg font-semibold text-[15px] hover:bg-[#0D7A82] transition-colors whitespace-nowrap"
                        >
                            View Our Journey →
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* COMMUNITY CAROUSEL */}
            <CommunityCarousel />

            {/* CTA */}
            <section className="py-6 md:py-8 bg-brand-deeper-teal px-4 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 max-w-7xl mx-auto w-full"
                >
                    <h2 className="text-2xl md:text-3xl m-0 text-white text-center md:text-left">Ready to start your journey with Meezan?</h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center shrink-0">
                        <Link href="/courses" className="bg-brand-teal text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-dark-teal transition-colors shadow-sm hover:-translate-y-1">
                            Explore Courses
                        </Link>
                        <Link href="/#contact" className="px-6 py-3 rounded-full font-semibold border-2 border-white/30 text-white hover:bg-white hover:text-brand-deeper-teal transition-colors">
                            Contact Us
                        </Link>
                    </div>
                </motion.div>
            </section>

        </div>
    );
}
