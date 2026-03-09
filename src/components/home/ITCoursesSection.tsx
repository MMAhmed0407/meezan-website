"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const longTermCourses = [
    {
        title: "Data Analyst",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
        tags: ["Tableau", "Power BI", "Excel", "R", "Python", "Statistics", "SQL"]
    },
    {
        title: "Data Science",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80",
        tags: ["Python", "R", "Statistics", "Probability", "Machine Learning", "AI"]
    },
    {
        title: "Power BI + AI",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
        tags: ["Visualization", "Modelling", "Analysis", "Connectivity", "Reporting"]
    },
    {
        title: "Project Management",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80",
        tags: ["Scope", "Schedule", "Budget", "Quality", "Risk"]
    }
];

const shortTermCourses = ["Python", "Excel + AI", "Statistics", "Tableau"];

export default function ITCoursesSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section className="py-12 md:py-16 lg:py-20 bg-white" id="it-long">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <h2 className="text-3xl lg:text-4xl">Long Term IT Courses</h2>
                        <div className="h-0.5 flex-1 bg-gradient-to-r from-border to-transparent hidden sm:block" />
                    </div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
                >
                    {longTermCourses.map((course) => (
                        <motion.div
                            key={course.title}
                            variants={itemVariants}
                            className="bg-white border text-left border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                        >
                            <div className="relative h-40 overflow-hidden w-full">
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    fill
                                    loading="lazy"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-xl mb-4">{course.title}</h3>
                                <div className="flex flex-wrap gap-2 mb-6 flex-1">
                                    {course.tags.map(tag => (
                                        <span key={tag} className="bg-brand-light text-brand-deeper-teal border border-border/50 text-xs px-2.5 py-1 rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <Link
                                    href={`/#enquiry-form?course=${encodeURIComponent(course.title)}`}
                                    className="inline-flex items-center gap-2 text-brand-teal font-semibold hover:text-brand-dark-teal transition-colors group/link mt-auto w-fit"
                                >
                                    Enquire <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Short Term Courses */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                    id="it-short"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <h3 className="text-2xl lg:text-3xl text-brand-deeper-teal">Short Term Courses</h3>
                        <div className="h-0.5 flex-1 bg-gradient-to-r from-border to-transparent hidden sm:block" />
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {shortTermCourses.map((course, index) => (
                            <motion.div
                                key={course}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="bg-brand-light border border-black/5 rounded-xl p-5 text-center hover:bg-white hover:shadow-md hover:border-brand-accent/50 transition-all group"
                            >
                                <p className="font-semibold text-brand-deeper-teal group-hover:text-brand-teal transition-colors">{course}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
