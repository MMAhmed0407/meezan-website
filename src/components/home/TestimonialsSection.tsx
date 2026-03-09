"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Fatima R.",
        course: "Paramedic Programme",
        quote: "Joining Meezan's paramedical programme changed my career completely. The hands-on training and clinical exposure were exceptional.",
        initials: "FR",
        color: "bg-blue-100 text-blue-700"
    },
    {
        name: "Rahul M.",
        course: "Management Training",
        quote: "The management training helped me launch my startup with confidence. The mentorship on SOPs and brand building was invaluable.",
        initials: "RM",
        color: "bg-emerald-100 text-emerald-700"
    },
    {
        name: "Priya S.",
        course: "ECCE Programme",
        quote: "The teachers training course gave me the tools I never had in college. I now handle my classroom with confidence and empathy.",
        initials: "PS",
        color: "bg-purple-100 text-purple-700"
    },
    {
        name: "Azhar K.",
        course: "Data Science",
        quote: "Data Science course at Turnkey was hands-on, practical and job-focused. I landed a role right after completing my projects.",
        initials: "AK",
        color: "bg-amber-100 text-amber-700"
    },
    {
        name: "Sneha T.",
        course: "Career Counselling",
        quote: "Career counselling helped me discover my strengths and land my dream job. I highly recommend taking their psychometric tests.",
        initials: "ST",
        color: "bg-rose-100 text-rose-700"
    },
    {
        name: "Mohammed A.",
        course: "Coaching",
        quote: "The public speaking coaching transformed how I present myself at work. I no longer fear board meetings.",
        initials: "MA",
        color: "bg-indigo-100 text-indigo-700"
    }
];

export default function TestimonialsSection() {
    // Duplicating array for infinite scroll effect
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    return (
        <section className="py-24 bg-brand-light overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="mb-4">What Our Students Say</h2>
                    <p className="text-lg text-foreground/70">Real results from real people who transformed their careers.</p>
                </motion.div>
            </div>

            <div className="relative w-full pb-8">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-brand-light to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-brand-light to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-6 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 40,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {duplicatedTestimonials.map((testimonial, i) => (
                        <div
                            key={`${testimonial.name}-${i}`}
                            className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-border w-[280px] sm:w-[350px] lg:w-[400px] flex-shrink-0"
                        >
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, idx) => (
                                    <Star key={idx} size={16} fill="#F5A623" className="text-brand-accent" />
                                ))}
                            </div>
                            <p className="text-foreground/80 italic mb-8 leading-relaxed text-sm md:text-base">"{testimonial.quote}"</p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold font-sans ${testimonial.color}`}>
                                    {testimonial.initials}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-brand-deeper-teal leading-tight">{testimonial.name}</h4>
                                    <p className="text-xs text-brand-teal font-medium mt-0.5">{testimonial.course}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
