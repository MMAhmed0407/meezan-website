"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Activity, HeartHandshake, Brain, Briefcase, TrendingUp, Users } from "lucide-react";

const categories = [
    {
        title: "Paramedic & Health Services",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80",
        badge: "Health",
        icon: Activity,
        bullets: ["Midwifery Nursing", "Operation Theater Technician", "Radiology Technician", "Dialysis Assistant"],
        link: "/courses#health"
    },
    {
        title: "Home Healthcare",
        image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80",
        badge: "Care",
        icon: HeartHandshake,
        bullets: ["Nursing Assistance at Your Doorstep", "Medication Administration", "Wound Care & Dressing", "Palliative Care"],
        link: "/courses#home-health"
    },
    {
        title: "Psychology",
        image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80",
        badge: "Science",
        icon: Brain,
        bullets: ["Child & Social Psychology", "Cognitive Psychology", "Psychopathology", "Personality Assessment"],
        link: "/courses#psychology"
    },
    {
        title: "Management Training",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
        badge: "Business",
        icon: Briefcase,
        bullets: ["Brand Building & SOPs/KPIs", "Incubation for Entrepreneurs", "Individual Training", "Organizational Training"],
        link: "/courses#management"
    },
    {
        title: "Consulting",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
        badge: "Corporate",
        icon: TrendingUp,
        bullets: ["Business & Startup Planning", "Branding & Positioning", "Product Launch", "Strategic Consulting"],
        link: "/courses#consulting"
    },
    {
        title: "Counselling",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80",
        badge: "Guidance",
        icon: Users,
        bullets: ["Career Counselling", "SWOT Analysis", "Psychometric Tests", "Personality Development"],
        link: "/courses#counselling"
    }
];

export default function CategoriesSection() {
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
        <section className="py-12 md:py-16 lg:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="mb-4">Courses Offered at Meezan Institute</h2>
                    <p className="text-lg text-foreground/70">
                        Choose from a wide range of professional programmes designed to launch and accelerate your career.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {categories.map((category) => (
                        <motion.div
                            key={category.title}
                            variants={cardVariants}
                            className="bg-white rounded-2xl border border-border overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full"
                        >
                            <div className="relative h-48 w-full overflow-hidden">
                                <div className="absolute top-4 left-4 z-10 bg-brand-accent text-brand-deeper-teal font-bold text-xs px-3 py-1 uppercase tracking-col rounded-sm shadow-sm">
                                    {category.badge}
                                </div>
                                <Image
                                    src={category.image}
                                    alt={category.title}
                                    fill
                                    loading="lazy"
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-brand-light p-2.5 rounded-xl text-brand-teal">
                                        <category.icon size={24} />
                                    </div>
                                    <h3 className="text-xl leading-tight">{category.title}</h3>
                                </div>

                                <ul className="space-y-2 mb-8 flex-1">
                                    {category.bullets.map((bullet, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                                            <span className="text-brand-accent font-bold mt-0.5">•</span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={category.link}
                                    className="inline-flex items-center gap-2 text-brand-teal font-semibold hover:text-brand-dark-teal transition-colors group/link mt-auto"
                                >
                                    Learn More
                                    <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
