"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const coachingServices = [
    { icon: "🏆", title: "Leadership Coaching", desc: "Develop the mindset and skills of a great leader to inspire teams and drive results." },
    { icon: "🎯", title: "Goal Setting Coaching", desc: "Turn your vague ambitions into a concrete, actionable roadmap for success." },
    { icon: "🎤", title: "Public Speaking Coaching", desc: "Speak with confidence that commands the room and leaves a lasting impact." },
    { icon: "⏰", title: "Time Management Coaching", desc: "Reclaim your time, defeat procrastination, and double your daily productivity." },
    { icon: "💰", title: "Financial Coaching", desc: "Build the financial future you deserve with smart planning and abundance mindsets." },
    { icon: "🎨", title: "Creativity Coaching", desc: "Break through mental blocks and unleash your full creative potential in work and life." },
];

export default function CoachingSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section className="py-12 md:py-16 lg:py-20 bg-brand-light relative overflow-hidden" aria-labelledby="coaching-heading">
            {/* Abstract Background Shapes */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-brand-teal/5 rounded-full blur-[80px]" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-deeper-teal/5 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <h2 id="coaching-heading" className="mb-4">Discover Coaching at Meezan</h2>
                    <p className="text-lg text-foreground/70">
                        Personal coaching that creates real, lasting change. Unlock your potential with our intensive 1-on-1 and group coaching programs.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {coachingServices.map((service) => (
                        <motion.div
                            key={service.title}
                            variants={cardVariants}
                            className="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
                        >
                            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform origin-left">{service.icon}</div>
                            <h3 className="text-xl mb-3">{service.title}</h3>
                            <p className="text-foreground/70 text-sm leading-relaxed mb-6 flex-1">
                                {service.desc}
                            </p>
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent("open-contact-widget", { detail: { course: service.title } }))}
                                className="inline-flex items-center gap-2 text-brand-deeper-teal font-semibold hover:text-brand-teal transition-colors w-fit border-b-2 border-transparent hover:border-brand-teal pb-0.5"
                            >
                                Enquire Now
                                <ArrowRight size={16} />
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
