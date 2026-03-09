"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const programmes = [
    { title: "Early Childhood Care & Education (ECCE)", desc: "Build a strong foundation for young learners with our specialized early childhood framework." },
    { title: "Pre-Primary Teacher Training", desc: "Equip yourself with modern pedagogical skills for kindergarten and pre-primary education." },
    { title: "Autism Spectrum Disorder (ASD)", desc: "Learn to support, educate, and empower children on the autism spectrum with compassionate techniques." },
    { title: "Life Skills Training", desc: "Master the art of teaching essential life skills for holistic student development." },
    { title: "ADHD Support Training", desc: "Specialized strategies and classroom management techniques for teaching students with ADHD." },
    { title: "Faculty Development Programme (FDP)", desc: "Advanced methodologies and leadership skills for existing educators looking to upgrade." },
    { title: "Leadership Development Programme (LDP)", desc: "Train to become an educational leader, principal, or administrator." },
];

export default function TeachersTrainingSection() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 md:mb-16 md:text-center max-w-3xl md:mx-auto"
                >
                    <h2 className="mb-4 text-2xl md:text-3xl lg:text-4xl">Teacher's Training Programmes</h2>
                    <p className="text-base md:text-lg text-foreground/70">
                        Shaping the educators who shape the future. Join our comprehensive training modules designed for modern educational needs.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Image - appears above accordion on mobile */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="w-full lg:w-1/2 relative h-[250px] sm:h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80"
                            alt="Enthusiastic teacher training session"
                            fill
                            className="object-cover"
                            loading="lazy"
                        />
                        {/* Decorative element */}
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-teal rounded-full blur-3xl opacity-20 pointer-events-none" />
                    </motion.div>

                    {/* Right Accordion */}
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
                                        <p className="mb-6">{prog.desc}</p>
                                        <Link
                                            href={`/#enquiry-form?course=${encodeURIComponent(prog.title)}`}
                                            className="inline-block bg-brand-deeper-teal text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-brand-teal transition-all shadow-sm hover:-translate-y-0.5"
                                        >
                                            Enroll Now
                                        </Link>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
