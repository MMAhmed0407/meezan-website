"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, ClipboardList, Target, Eye, HeartHandshake, BadgeCheck } from "lucide-react";
import { BreadcrumbSchema } from "@/components/global/SchemaOrg";

export default function AboutPage() {
    const team = [
        { name: "Dr. Ayesha K.", role: "Principal Director", bio: "Leading Meezan Institute with 20+ years of educational excellence.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" },
        { name: "Mr. Mohammed S.", role: "Head of Paramedical Studies", bio: "Former chief nurse turned dedicated healthcare educator.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" },
        { name: "Ms. Priya R.", role: "Director of IT Programs", bio: "Driving tech innovation and TurnkeyBS curriculum design.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80" }
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
                        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-tight mb-6">
                            About Meezan Educational Institute Hyderabad
                        </h1>
                        <p className="text-lg text-white/80 leading-relaxed border-l-4 border-brand-teal pl-4">
                            Encourage to Educate to Empower — Building careers, transforming lives, and serving communities since our founding in Hyderabad.
                        </p>
                    </motion.div>
                </div>
                <div className="w-full lg:w-1/2 relative min-h-[40vh] lg:min-h-full">
                    <motion.div
                        initial={{ scale: 1.05, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.2 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80"
                            alt="Group of educators and students collaborating at Meezan Educational Institute Hyderabad"
                            fill
                            className="object-cover"
                            priority={true}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-deeper-teal via-transparent to-transparent lg:hidden" />
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-deeper-teal via-transparent to-transparent hidden lg:block w-32 left-0" />
                    </motion.div>
                </div>
            </section>

            {/* OUR STORY */}
            <section className="py-20 lg:py-32 bg-white" aria-labelledby="about-story-heading">
                <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="w-full lg:w-1/2"
                    >
                        <h2 id="about-story-heading" className="mb-6 text-3xl lg:text-4xl">Our Story</h2>
                        <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
                            <p>
                                Meezan Educational Institute was founded with a singular mission — to empower individuals through quality education, professional training, and compassionate healthcare.
                            </p>
                            <p>
                                From paramedical sciences to personality development and cutting-edge IT skills, we bridge the gap between learning and real-world success. We believe that true education goes beyond textbooks to develop the whole person — equipping them with practical competencies and robust character.
                            </p>
                            <p>
                                Associated with TurnkeyBS, we continue to expand our course offerings to meet the demands of a fast-changing world, ensuring our students are not just employable, but ready to lead.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="w-full lg:w-1/2"
                    >
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80"
                                alt="Mentor with students at Meezan Educational Institute Hyderabad"
                                fill
                                loading="lazy"
                                priority={false}
                                className="object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* MISSION & VISION */}
            <section className="py-20 bg-brand-light" aria-label="Mission and Vision">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
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
                            To be Hyderabad's most trusted institution for paramedical, professional, and technology education, continuously setting new benchmarks for academic excellence.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* WHY CHOOSE US - Mini Version */}
            <section className="py-20 bg-white" aria-labelledby="about-pillars-heading">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 id="about-pillars-heading" className="text-center mb-16 text-3xl">Our Core Pillars</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: GraduationCap, title: "Expert Faculty" },
                            { icon: ClipboardList, title: "Practical Training" },
                            { icon: HeartHandshake, title: "Holistic Growth" },
                            { icon: BadgeCheck, title: "Affordable Fees" }
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
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CLINIC SECTION */}
            <section className="py-24 bg-gradient-to-b from-brand-light to-white" aria-labelledby="about-clinic-heading">
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
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl mb-12">
                            <Image
                                src="https://images.unsplash.com/photo-1542884748-2b87b00f3652?auto=format&fit=crop&q=80"
                                alt="Shoukath Ali Charitable Clinic by Meezan Educational Institute Hyderabad"
                                fill
                                loading="lazy"
                                priority={false}
                                className="object-cover"
                            />
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

            {/* TEAM SECTION */}
            <section className="py-24 bg-white border-t border-border" aria-labelledby="about-team-heading">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 id="about-team-heading" className="text-center mb-16 text-3xl md:text-4xl">Our Leadership</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="bg-brand-light rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all group"
                            >
                                <div className="aspect-[4/5] relative overflow-hidden">
                                    <Image
                                        src={member.img}
                                        alt={`${member.name} - ${member.role} at Meezan Educational Institute Hyderabad`}
                                        fill
                                        loading="lazy"
                                        priority={false}
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-8 text-center bg-white relative z-10 -mt-6 mx-4 rounded-xl border border-border shadow-md">
                                    <h3 className="text-xl text-brand-deeper-teal mb-1">{member.name}</h3>
                                    <p className="text-brand-teal font-medium text-sm mb-4">{member.role}</p>
                                    <p className="text-foreground/70 text-sm">{member.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PARTNERS */}
            <section className="py-20 bg-brand-light text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="mb-10 text-xl font-medium text-foreground/60 uppercase tracking-widest">Proudly Associated With</h2>
                    <div className="inline-flex items-center gap-4 bg-white px-8 py-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-brand-deeper-teal rounded-xl flex items-center justify-center text-brand-accent font-bold text-xl">
                            T
                        </div>
                        <div className="text-left">
                            <h4 className="text-2xl font-bold text-brand-deeper-teal">TurnkeyBS</h4>
                            <p className="text-brand-teal text-sm font-medium">IT Excellence Partner</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-brand-deeper-teal text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl mb-6 text-white">Ready to start your journey with Meezan?</h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/courses" className="bg-brand-teal text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-dark-teal transition-colors shadow-lg shadow-brand-teal/20 hover:-translate-y-1">
                            Explore Courses
                        </Link>
                        <Link href="/#contact" className="px-8 py-4 rounded-full font-semibold border-2 border-white/30 text-white hover:bg-white hover:text-brand-deeper-teal transition-colors">
                            Contact Us
                        </Link>
                    </div>
                </motion.div>
            </section>

        </div>
    );
}
