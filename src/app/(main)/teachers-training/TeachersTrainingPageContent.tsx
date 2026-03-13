"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, PhoneCall } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const programmes = [
    {
        title: "Early Childhood Care & Education (ECCE)",
        desc: "Build a strong foundation for young learners with our specialized early childhood framework.",
        duration: "1 Year",
        mode: "Hybrid",
    },
    {
        title: "Pre-Primary Teacher Training",
        desc: "Equip yourself with modern pedagogical skills for kindergarten and pre-primary education.",
        duration: "1 Year",
        mode: "Hybrid",
    },
    {
        title: "Autism Spectrum Disorder (ASD)",
        desc: "Learn to support, educate, and empower children on the autism spectrum with compassionate techniques.",
        duration: "6 Months",
        mode: "Online",
    },
    {
        title: "Life Skills Training",
        desc: "Master the art of teaching essential life skills for holistic student development.",
        duration: "3 Months",
        mode: "Online",
    },
    {
        title: "ADHD Support Training",
        desc: "Specialized strategies and classroom management techniques for teaching students with ADHD.",
        duration: "3 Months",
        mode: "Online",
    },
    {
        title: "Faculty Development Programme (FDP)",
        desc: "Advanced methodologies and leadership skills for existing educators looking to upgrade.",
        duration: "Varies",
        mode: "Offline",
    },
    {
        title: "Leadership Development Programme (LDP)",
        desc: "Train to become an educational leader, principal, or administrator.",
        duration: "3 Months",
        mode: "Hybrid",
    },
];

export default function TeachersTrainingPageContent() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="bg-brand-deeper-teal pt-32 pb-20 text-center px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-accent/10 rounded-full blur-[80px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 max-w-3xl mx-auto"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                        Teacher&apos;s Training Programmes
                    </h1>
                    <p className="text-lg text-white/80 max-w-xl mx-auto">
                        Shaping the educators who shape the future. Join our comprehensive training modules designed for modern educational needs.
                    </p>
                </motion.div>
            </section>

            {/* Programmes Section */}
            <section className="py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="w-full lg:w-1/2 relative h-[250px] sm:h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80"
                                alt="Teacher training session at Meezan Educational Institute"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-teal rounded-full blur-3xl opacity-20 pointer-events-none" />
                        </motion.div>

                        {/* Accordion */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="w-full lg:w-1/2"
                        >
                            <Accordion className="w-full">
                                {programmes.map((prog) => (
                                    <AccordionItem key={prog.title} value={prog.title} className="border-b-border pb-2 mb-2">
                                        <AccordionTrigger className="text-left text-lg font-semibold hover:text-brand-teal md:text-xl py-4 transition-colors">
                                            {prog.title}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-foreground/70 text-base leading-relaxed pb-6">
                                            <p className="mb-3">{prog.desc}</p>
                                            <div className="flex flex-wrap gap-3 mb-6">
                                                <span className="bg-brand-light text-brand-deeper-teal text-xs px-3 py-1 rounded-full font-medium">
                                                    {prog.duration}
                                                </span>
                                                <span className="bg-brand-light text-brand-deeper-teal text-xs px-3 py-1 rounded-full font-medium">
                                                    {prog.mode}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => window.dispatchEvent(new CustomEvent("open-contact-widget", { detail: { course: prog.title } }))}
                                                className="inline-block bg-brand-deeper-teal text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-brand-teal transition-all shadow-sm hover:-translate-y-0.5"
                                            >
                                                Enroll Now
                                            </button>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Speak to a Counsellor CTA */}
            <section className="bg-brand-deeper-teal py-6 md:py-8 px-4 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 max-w-7xl mx-auto w-full"
                >
                    <div className="text-center lg:text-left">
                        <h2 className="text-2xl md:text-3xl text-white mb-1">Speak to a Counsellor</h2>
                        <p className="text-base text-white/80 m-0">
                            Not sure which programme is right for you? Our team is here to help.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center shrink-0">
                        <a
                            href="https://wa.me/917730019572"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-md hover:-translate-y-1"
                        >
                            <MessageCircle size={18} />
                            Chat on WhatsApp
                        </a>
                        <a
                            href="tel:+919010186447"
                            className="inline-flex items-center justify-center gap-2 bg-white text-brand-deeper-teal px-6 py-3 rounded-full font-bold text-sm hover:bg-brand-light transition-all shadow-md hover:-translate-y-1"
                        >
                            <PhoneCall size={18} />
                            Call Us Now
                        </a>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
