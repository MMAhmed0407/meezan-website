"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, GraduationCap, MapPin } from "lucide-react";

// Mock Data
const courseCategories = [
    {
        id: "health",
        title: "Paramedic & Health Services",
        description: "Launch your healthcare career with intensive, practical training programs.",
        bg: "bg-white",
        courses: [
            { title: "Midwifery Nursing", duration: "2 Years", mode: "Offline", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80" },
            { title: "Operation Theater Technician", duration: "1 Year", mode: "Offline", image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80" },
            { title: "Radiology Technician", duration: "2 Years", mode: "Offline", image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80" },
            { title: "Medical Lab Technician", duration: "2 Years", mode: "Offline", image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80" },
            { title: "Hospital Management", duration: "1 Year", mode: "Hybrid", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80" },
            { title: "Respiratory Therapy", duration: "2 Years", mode: "Offline", image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80" },
            { title: "Dialysis Assistant", duration: "1 Year", mode: "Offline", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80" },
            { title: "Dental Assistant", duration: "1 Year", mode: "Offline", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80" }
        ]
    },
    {
        id: "home-health",
        title: "Home Healthcare Services",
        description: "Specialized training for compassionate at-home patient care.",
        bg: "bg-brand-light",
        courses: [
            { title: "Nursing Assistance at Your Doorstep", duration: "6 Months", mode: "Offline", image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80" },
            { title: "Medication Administration", duration: "3 Months", mode: "Hybrid", image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80" },
            { title: "Wound Care & Palliative Care", duration: "6 Months", mode: "Offline", image: "https://images.unsplash.com/photo-1573883430060-14e9112521c7?auto=format&fit=crop&q=80" },
            { title: "Elderly Care", duration: "6 Months", mode: "Offline", image: "https://images.unsplash.com/photo-1447452001602-7090c7ab2bf3?auto=format&fit=crop&q=80" }
        ]
    },
    {
        id: "psychology",
        title: "Psychology",
        description: "Explore the human mind and behavior with our psychology programmes.",
        bg: "bg-white",
        courses: [
            { title: "Child & Social Psychology", duration: "1 Year", mode: "Online", image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80" },
            { title: "Cognitive Psychology", duration: "1 Year", mode: "Online", image: "https://images.unsplash.com/photo-1554526229-68875883ef3c?auto=format&fit=crop&q=80" },
            { title: "Psychopathology", duration: "6 Months", mode: "Hybrid", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80" },
            { title: "Personality Assessment", duration: "3 Months", mode: "Online", image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80" },
            { title: "Clinical Psychology Basics", duration: "1 Year", mode: "Hybrid", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80" }
        ]
    },
    {
        id: "management",
        title: "Management Training",
        description: "Gain the strategic skills to build brands, optimize processes, and lead teams.",
        bg: "bg-brand-light",
        courses: [
            { title: "Brand Building & SOPs/KPIs", duration: "6 Months", mode: "Hybrid", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" },
            { title: "Incubation for Entrepreneurs", duration: "6 Months", mode: "Hybrid", image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80" },
            { title: "Individual & Organizational Training", duration: "3 Months", mode: "Online", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80" },
            { title: "Operations Planning", duration: "3 Months", mode: "Online", image: "https://images.unsplash.com/photo-1664575602276-cd0735ee034e?auto=format&fit=crop&q=80" }
        ]
    },
    {
        id: "consulting",
        title: "Consulting",
        description: "Master the art of advising businesses on strategic scaling and problem-solving.",
        bg: "bg-white",
        courses: [
            { title: "Business & Startup Planning", duration: "3 Months", mode: "Online", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80" },
            { title: "Branding & Product Launch", duration: "3 Months", mode: "Hybrid", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80" },
            { title: "Strategic Consulting", duration: "6 Months", mode: "Hybrid", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80" },
            { title: "Financial Advisory", duration: "3 Months", mode: "Online", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80" }
        ]
    },
    {
        id: "counselling",
        title: "Counselling",
        description: "Learn to guide individuals through significant career and life choices.",
        bg: "bg-brand-light",
        courses: [
            { title: "Career Counselling & Guidance", duration: "3 Months", mode: "Online", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80" },
            { title: "SWOT Analysis & Psychometric Tests", duration: "3 Months", mode: "Online", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80" },
            { title: "Personality Development", duration: "3 Months", mode: "Hybrid", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80" },
            { title: "Academic Counselling", duration: "3 Months", mode: "Online", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80" }
        ]
    },
    {
        id: "teachers",
        title: "Teacher's Training",
        description: "Shaping the educators who shape the future.",
        bg: "bg-white",
        courses: [
            { title: "Early Childhood Care & Education (ECCE)", duration: "1 Year", mode: "Hybrid", image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80" },
            { title: "Pre-Primary Teacher Training", duration: "1 Year", mode: "Hybrid", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80" },
            { title: "Autism Spectrum Disorder (ASD)", duration: "6 Months", mode: "Online", image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=80" },
            { title: "Life Skills Training", duration: "3 Months", mode: "Online", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80" },
            { title: "ADHD Support Training", duration: "3 Months", mode: "Online", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80" },
            { title: "Faculty Development Programme (FDP)", duration: "Varies", mode: "Offline", image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80" },
            { title: "Leadership Development Programme (LDP)", duration: "3 Months", mode: "Hybrid", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" }
        ]
    },
    {
        id: "it-long",
        title: "Long Term IT Courses (via TurnkeyBS)",
        description: "Job-focused tech degrees for the modern era.",
        bg: "bg-brand-light",
        courses: [
            { title: "Data Analyst", duration: "6 Months", mode: "Hybrid", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" },
            { title: "Data Science", duration: "1 Year", mode: "Hybrid", image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80" },
            { title: "Power BI + AI", duration: "6 Months", mode: "Hybrid", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80" },
            { title: "Project Management", duration: "6 Months", mode: "Hybrid", image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80" }
        ]
    },
    {
        id: "it-short",
        title: "Short Term IT Courses",
        description: "Fast-track your skills in weeks, not months.",
        bg: "bg-white",
        courses: [
            { title: "Python Basics", duration: "4 Weeks", mode: "Online", image: "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?auto=format&fit=crop&q=80" },
            { title: "Excel + AI", duration: "4 Weeks", mode: "Online", image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&q=80" },
            { title: "Applied Statistics", duration: "6 Weeks", mode: "Online", image: "https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&q=80" },
            { title: "Tableau Fundamentals", duration: "4 Weeks", mode: "Online", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" }
        ]
    }
];

export default function CoursesPage() {
    const categories = ["All", "Health", "Psychology", "Management", "IT", "Coaching"];

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="bg-brand-deeper-teal pt-32 pb-24 text-center px-4 relative overflow-hidden">
                {/* Abstract shapes */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-accent/10 rounded-full blur-[80px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 max-w-3xl mx-auto"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6">Explore All Our Programmes</h1>
                    <p className="text-lg text-white/80 max-w-xl mx-auto mb-12">From healthcare to technology — find the course that launches your career and transforms your life.</p>

                    <div className="flex flex-nowrap overflow-x-auto pb-4 justify-start md:justify-center gap-2 md:gap-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                        {categories.map((cat) => (
                            <a
                                key={cat}
                                href={cat === "All" ? "#health" : `#${cat.toLowerCase()}`}
                                className="bg-white/10 hover:bg-brand-teal border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap shrink-0"
                            >
                                {cat}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Courses Loop */}
            {courseCategories.map((category, index) => (
                <section key={category.id} id={category.id} className={`py-12 md:py-16 lg:py-20 ${category.bg} scroll-mt-20`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-12 md:mb-16 text-center max-w-2xl mx-auto"
                        >
                            <h2 className="mb-4 text-3xl md:text-4xl">{category.title}</h2>
                            <p className="text-lg text-foreground/70">{category.description}</p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {category.courses.map((course, i) => (
                                <motion.div
                                    key={course.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                                >
                                    <div className="relative h-48 w-full overflow-hidden bg-brand-light">
                                        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 items-end">
                                            <span className="bg-white/90 backdrop-blur-sm text-brand-deeper-teal font-semibold text-xs px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1.5">
                                                <Clock size={12} className="text-brand-teal" /> {course.duration}
                                            </span>
                                            <span className="bg-brand-deeper-teal/90 backdrop-blur-sm text-white font-semibold text-xs px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1.5">
                                                <MapPin size={12} className="text-brand-accent" /> {course.mode}
                                            </span>
                                        </div>
                                        <Image
                                            src={course.image}
                                            alt={course.title}
                                            fill
                                            loading="lazy"
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-lg leading-tight mb-4 group-hover:text-brand-teal transition-colors">{course.title}</h3>
                                        <ul className="space-y-2 mb-6 flex-1">
                                            <li className="flex items-start gap-2 text-sm text-foreground/70">
                                                <GraduationCap size={16} className="text-brand-teal shrink-0 mt-0.5" />
                                                <span>Professional Certification</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-sm text-foreground/70">
                                                <MapPin size={16} className="text-brand-accent shrink-0 mt-0.5" />
                                                <span>{course.mode} Mode Available</span>
                                            </li>
                                        </ul>
                                        <Link
                                            href={`/#enquiry-form?course=${encodeURIComponent(course.title)}`}
                                            className="w-full text-center bg-brand-light text-brand-deeper-teal px-4 py-2.5 rounded-lg border border-border/50 font-semibold hover:bg-brand-teal hover:text-white hover:border-brand-teal transition-colors mt-auto"
                                        >
                                            Enquire Now
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            {/* CTA Strip */}
            <section className="bg-brand-teal py-16 text-center text-white px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-white text-3xl md:text-4xl mb-6">Not sure which course is right for you?</h2>
                    <Link
                        href="/#enquiry-form"
                        className="inline-block bg-white text-brand-teal px-8 py-4 rounded-full font-bold hover:bg-brand-deeper-teal hover:text-white transition-all shadow-lg hover:-translate-y-1"
                    >
                        Talk to Our Counsellor
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
