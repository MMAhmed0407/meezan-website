"use client";

import { motion } from "framer-motion";
import { GraduationCap, ClipboardList, Target, Briefcase } from "lucide-react";

const features = [
    {
        icon: GraduationCap,
        title: "Expert Faculty",
        description: "Industry-qualified trainers with real-world functional experience."
    },
    {
        icon: ClipboardList,
        title: "Practical Curriculum",
        description: "Hands-on learning focused entirely on applicable skills, not just theory."
    },
    {
        icon: Target,
        title: "Holistic Approach",
        description: "Healthcare, Tech, and Coaching combined in one truly inclusive institution."
    },
    {
        icon: Briefcase,
        title: "Career-Focused",
        description: "Dedicated job placement support and deep local industry connections."
    }
];

export default function WhyChooseSection() {
    return (
        <section className="py-6 md:py-8 lg:py-10 bg-brand-light overflow-hidden" aria-labelledby="why-choose-heading">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto mb-6 md:mb-8"
                >
                    <h2 id="why-choose-heading" className="mb-4">Why Students Choose Meezan</h2>
                    <p className="text-lg text-foreground/70">
                        We don't just teach — we transform. Our proven methodologies deliver real results.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                    {features.map((feature, index) => {
                        // Alternating fade from left (even) or right (odd)
                        const isEven = index % 2 === 0;
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
                            >
                                <div className="bg-brand-deeper-teal/5 p-4 rounded-full text-brand-teal mb-6 group-hover:bg-brand-teal group-hover:text-white transition-colors duration-300">
                                    <feature.icon size={36} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl mb-3">{feature.title}</h3>
                                <p className="text-foreground/70 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
