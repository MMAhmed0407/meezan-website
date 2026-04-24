import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import HeroCarousel from "./HeroCarousel";

export default function HeroSection() {
    return (
        <section className="relative min-h-[70vh] flex flex-col lg:flex-row w-full overflow-hidden bg-brand-deeper-teal">
            {/* Left Content */}
            <div className="w-full lg:w-[55%] relative flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-6 lg:py-0 z-10">
                {/* Subtle diagonal pattern overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}
                />

                <div className="relative z-10 max-w-2xl">
                    <div className="mb-4 inline-block">
                        <span className="text-brand-accent uppercase tracking-widest text-[10px] sm:text-xs font-semibold border border-brand-accent/30 bg-brand-accent/10 px-4 py-1.5 rounded-full whitespace-nowrap">
                            <span className="sm:hidden">Premier Training Institute</span>
                            <span className="hidden sm:inline">Hyderabad&apos;s Premier Training Institute</span>
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-6">
                        Healthcare &amp; Coaching Training Institute in Hyderabad
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed mb-6 max-w-xl">
                        Encourage to Educate to Empower — From paramedical sciences to personality development and teacher&apos;s training, building careers and transforming lives.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <Link
                            href="/courses"
                            className="bg-brand-teal text-white px-8 py-4 rounded-full font-semibold text-center hover:bg-brand-dark-teal transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto"
                        >
                            Explore Courses
                        </Link>
                        <Link
                            href="/#contact"
                            className="px-8 py-4 rounded-full font-semibold text-center border-2 border-white text-white hover:bg-white hover:text-brand-deeper-teal transition-all duration-200 w-full sm:w-auto"
                        >
                            Book Free Consultation
                        </Link>
                    </div>

                    {/* Trust Row */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/90">
                        {[
                            "12500+ Lives Changed",
                            "20+ Courses",
                            "Expert Faculty",
                            "Job-Focused Training"
                        ].map(text => (
                            <div key={text} className="flex items-center gap-1.5">
                                <CheckCircle2 size={16} className="text-[#25D366]" />
                                <span>{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Carousel */}
            <HeroCarousel />
        </section>
    );
}
