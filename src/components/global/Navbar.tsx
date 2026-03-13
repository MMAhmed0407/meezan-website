"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "About", href: "/about" },
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
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // Close mobile menu on route change
        setMobileMenuOpen(false);
        setMobileCoursesOpen(false);
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
            className={clsx(
                "sticky top-0 w-full z-40 transition-all duration-300",
                isScrolled ? "bg-white shadow-md py-3" : "bg-white/95 backdrop-blur-sm py-5"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-1 z-50">
                    <div className="bg-white rounded-lg px-2 py-1 shadow-sm">
                        <div className="relative w-[100px] h-8 sm:h-10 lg:w-[120px] lg:h-[45px] xl:w-[160px] xl:h-[60px]">
                            <Image
                                src="/images/meezan-logo.png"
                                alt="Meezan Educational Institute"
                                fill
                                className="object-contain max-h-8 sm:max-h-12"
                                priority
                            />
                        </div>
                    </div>
                </Link>

                {/* Desktop/Tablet Nav */}
                <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-4 xl:gap-8">
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

                                    {/* Desktop Dropdown */}
                                    <AnimatePresence>
                                        {coursesDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 8 }}
                                                transition={{ duration: 0.2, ease: "easeOut" }}
                                                className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                                            >
                                                <div className="bg-white rounded-xl shadow-xl border border-black/5 p-4 min-w-[520px] border-t-[3px] border-t-brand-teal">
                                                    <div className="flex flex-wrap gap-2">
                                                        {courseDropdownLinks.map((item) => (
                                                            <Link
                                                                key={item.label}
                                                                href={item.href}
                                                                className="flex-shrink-0 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-brand-deeper-teal hover:border-brand-teal hover:text-brand-teal hover:bg-brand-light transition-all duration-200 whitespace-nowrap"
                                                            >
                                                                {item.label}
                                                            </Link>
                                                        ))}
                                                    </div>
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

                {/* Action Buttons removed as per client request */}

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
            </div>

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
