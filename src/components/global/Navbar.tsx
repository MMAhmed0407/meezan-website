"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "About", href: "/about" },
    { name: "Our Journey", href: "/our-journey" },
    { name: "Blog", href: "/blog" },
];

const courseDropdownLinks = [
    { label: "Paramedic & Health Services", href: "/courses#paramedic" },
    { label: "Home Healthcare", href: "/courses#home-healthcare" },
    { label: "Psychology", href: "/courses#psychology" },
    { label: "Management Training", href: "/courses#management" },
    { label: "Consulting", href: "/courses#consulting" },
    { label: "Counselling", href: "/courses#counselling" },
    { label: "Teacher's Training", href: "/teachers-training" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
    const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useOutsideClick(navRef, () => {
        if (coursesDropdownOpen) setCoursesDropdownOpen(false);
    }, coursesDropdownOpen);

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                setCoursesDropdownOpen(false);
                setMobileMenuOpen(false);
            }
        }
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // Close mobile menu on route change
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMobileMenuOpen(false);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMobileCoursesOpen(false);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCoursesDropdownOpen(false);
    }, [pathname]);

    const handleMouseEnter = () => {
        if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
        setCoursesDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setCoursesDropdownOpen(false);
        }, 200);
    };

    return (
        <header
            ref={navRef}
            className={clsx(
                "sticky top-0 w-full z-40 h-16 flex items-center transition-all duration-300",
                isScrolled ? "bg-white shadow-md border-b border-border/50" : "bg-white/95 backdrop-blur-sm"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between gap-4 lg:gap-8">
                <div className="flex justify-start">
                    <Link href="/" className="flex items-center z-50">
                        <div className="bg-white rounded-lg px-2 shadow-sm flex items-center justify-center">
                            <div className="relative h-[40px] w-[140px] flex items-center">
                                {/* Next/Image needs width/height or fill. We use fill with object-contain to let it scale down to max-height */}
                                <Image
                                    src="/images/meezan-logo.png"
                                    alt="Meezan Educational Institute"
                                    fill
                                    className="object-contain object-left max-h-[40px] w-auto"
                                    priority
                                />
                            </div>
                        </div>
                    </Link>
                </div>

                <nav aria-label="Main navigation" className="hidden lg:flex flex-1 items-center justify-center gap-6 xl:gap-10">
                    {navLinks.map((link) => {
                        if (link.name === "Courses") {
                            return (
                                <div
                                    key={link.name}
                                    className="relative"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Link
                                        href={link.href}
                                        className={clsx(
                                            "text-xs xl:text-sm font-medium transition-colors hover:text-brand-teal relative group py-2 whitespace-nowrap inline-flex items-center gap-1",
                                            pathname === link.href ? "text-brand-teal" : "text-brand-deeper-teal"
                                        )}
                                    >
                                        {link.name}
                                        <ChevronDown
                                            size={14}
                                            className={clsx(
                                                "transition-transform duration-200",
                                                coursesDropdownOpen ? "rotate-180" : ""
                                            )}
                                        />
                                        <span
                                            className={clsx(
                                                "absolute bottom-0 left-0 w-full h-[2px] bg-brand-teal transition-transform duration-300 origin-left",
                                                pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                            )}
                                        />
                                    </Link>
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={clsx(
                                    "text-xs xl:text-sm font-medium transition-colors hover:text-brand-teal relative group py-2 whitespace-nowrap",
                                    pathname === link.href ? "text-brand-teal" : "text-brand-deeper-teal"
                                )}
                            >
                                {link.name}
                                <span
                                    className={clsx(
                                        "absolute bottom-0 left-0 w-full h-[2px] bg-brand-teal transition-transform duration-300 origin-left",
                                        pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                    )}
                                />
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex justify-end w-[140px]">
                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden text-brand-deeper-teal p-3 min-w-[44px] min-h-[44px] flex items-center justify-center z-50 hover:text-brand-teal transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Open navigation menu"
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    {/* Spacer for desktop to balance logo column */}
                    <div className="hidden lg:block min-w-[100px] lg:min-w-[120px] xl:min-w-[160px]" />
                </div>
            </div>

            {/* Desktop Full-Width Mega Menu */}
            <AnimatePresence>
                {coursesDropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 right-0 w-full bg-white border-t-2 border-brand-teal border-b border-border shadow-lg z-40 hidden lg:block"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="max-w-7xl mx-auto px-10 py-6 flex flex-wrap justify-center gap-3">
                            {courseDropdownLinks.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="px-5 py-2.5 rounded-full border-[1.5px] border-brand-teal text-sm font-medium text-brand-deeper-teal hover:bg-brand-teal hover:text-white transition-all duration-150 whitespace-nowrap bg-white"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-full left-0 right-0 w-full bg-white z-50 lg:hidden border-t border-black/5 shadow-2xl overflow-y-auto max-h-[calc(100vh-80px)]"
                    >
                        <nav aria-label="Mobile navigation" className="flex flex-col gap-1 p-6">
                            {navLinks.map((link) => {
                                if (link.name === "Courses") {
                                    return (
                                        <div key={link.name}>
                                            <button
                                                type="button"
                                                onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                                                className={clsx(
                                                    "w-full text-left text-base font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-between",
                                                    pathname === link.href ? "bg-brand-light text-brand-teal" : "text-brand-deeper-teal hover:bg-gray-50"
                                                )}
                                            >
                                                {link.name}
                                                <ChevronDown
                                                    size={18}
                                                    className={clsx(
                                                        "transition-transform duration-200",
                                                        mobileCoursesOpen ? "rotate-180" : ""
                                                    )}
                                                />
                                            </button>
                                            <AnimatePresence>
                                                {mobileCoursesOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="flex flex-col gap-1 pl-4 pt-1 pb-2">
                                                            <Link
                                                                href="/courses"
                                                                onClick={() => setMobileMenuOpen(false)}
                                                                className="text-sm font-semibold text-brand-teal py-2 px-4 rounded-lg hover:bg-brand-light transition-colors"
                                                            >
                                                                All Courses
                                                            </Link>
                                                            {courseDropdownLinks.map((item) => (
                                                                <Link
                                                                    key={item.label}
                                                                    href={item.href}
                                                                    onClick={() => setMobileMenuOpen(false)}
                                                                    className="text-sm font-medium text-brand-deeper-teal py-2 px-4 rounded-lg hover:bg-brand-light hover:text-brand-teal transition-colors"
                                                                >
                                                                    {item.label}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                }

                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={clsx(
                                            "text-base font-semibold py-3 px-4 rounded-xl transition-colors",
                                            pathname === link.href ? "bg-brand-light text-brand-teal" : "text-brand-deeper-teal hover:bg-gray-50"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                            <div className="h-px bg-gray-100 my-4" />
                            {/* Phone and Get Started removed as per client request */}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
