"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Teachers Training", href: "/courses#teachers" },
    { name: "IT Courses", href: "/courses#it-long" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // Close mobile menu on route change
        setMobileMenuOpen(false);
    }, [pathname]);

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
                        <div className="relative w-[100px] h-[35px] md:w-[120px] md:h-[45px] xl:w-[160px] xl:h-[60px]">
                            <Image
                                src="/images/meezan-logo.png"
                                alt="Meezan Educational Institute"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>
                </Link>

                {/* Desktop/Tablet Nav */}
                <nav className="hidden md:flex items-center gap-4 lg:gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={clsx(
                                "text-xs lg:text-sm font-medium transition-colors hover:text-brand-teal relative group py-2 whitespace-nowrap",
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
                    ))}
                </nav>

                {/* Action Buttons */}
                <div className="hidden md:flex items-center gap-4 lg:gap-6">
                    <a href="tel:+919010186447" className="hidden lg:flex items-center gap-2 text-brand-deeper-teal hover:text-brand-teal transition-colors font-medium">
                        <Phone size={18} />
                        <span className="text-sm">9010186447</span>
                    </a>
                    <Link
                        href="/#contact"
                        className="bg-brand-teal text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-full text-xs lg:text-sm font-semibold hover:bg-brand-dark-teal transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-brand-deeper-teal p-2 z-50 hover:text-brand-teal transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-full left-0 right-0 w-full bg-white z-50 md:hidden border-t border-black/5 shadow-2xl overflow-y-auto max-h-[calc(100vh-80px)]"
                    >
                        <nav className="flex flex-col gap-1 p-6">
                            {navLinks.map((link) => (
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
                            ))}
                            <div className="h-px bg-gray-100 my-4" />
                            <div className="flex flex-col gap-4 px-4">
                                <a href="tel:+919010186447" className="text-base font-semibold text-brand-deeper-teal flex items-center gap-3">
                                    <div className="bg-brand-light p-2 rounded-full text-brand-teal">
                                        <Phone size={18} />
                                    </div>
                                    9010186447
                                </a>
                                <Link
                                    href="/#contact"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="bg-brand-teal text-white py-4 rounded-xl font-bold text-center shadow-lg hover:bg-brand-dark-teal transition-all active:scale-95"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
