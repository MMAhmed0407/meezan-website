import Link from "next/link";
import Image from "next/image";
import { Zap } from "lucide-react";
import FooterSocialLinks from "./FooterSocialLinks";

export default function Footer() {
    return (
        <footer className="bg-brand-dark-teal text-white pt-10 pb-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {/* Col 1 */}
                    <div>
                        <div className="flex items-center gap-1 mb-6">
                            <div className="bg-white rounded-lg px-3 py-2 inline-block relative shadow-sm">
                                <div className="relative w-full max-w-[180px] aspect-[18/7]">
                                    <Image
                                        src="/images/meezan-logo.png"
                                        alt="Meezan Educational Institute logo at Meezan Educational Institute Hyderabad"
                                        fill
                                        className="object-contain"
                                        loading="lazy"
                                        priority={false}
                                    />
                                </div>
                            </div>
                        </div>
                        <p className="text-white/80 mb-6 max-w-sm">
                            Encourage to Educate to Empower. Transforming lives through quality education and professional training.
                        </p>
                        <FooterSocialLinks />
                    </div>

                    {/* Col 2 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white border-b border-white/20 pb-2 inline-block">Quick Links</h3>
                        <nav aria-label="Footer quick links">
                            <ul className="space-y-4">
                                {['Home', 'Courses', 'About', 'Blog', 'Contact'].map((link) => (
                                    <li key={link}>
                                        <Link href={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="text-white/80 hover:text-brand-teal transition-colors inline-block text-sm">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Col 3 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white border-b border-white/20 pb-2 inline-block">Contact Us</h3>
                        <address className="not-italic text-white/80 space-y-4 text-sm">
                            <p>201, Second Floor, Dorato Avenue,<br />Hyderabad, India</p>
                            <div className="space-y-2">
                                <p><a href="tel:+917730019572" className="hover:text-brand-teal transition-colors" aria-label="Call +91 77300 19572">+91 77300 19572</a></p>
                                <p><a href="tel:+919010186447" className="hover:text-brand-teal transition-colors" aria-label="Call +91 9010186447">+91 9010186447</a></p>
                                <p><a href="tel:+914045131341" className="hover:text-brand-teal transition-colors" aria-label="Call 040 45131341">040 45131341</a></p>
                            </div>
                            <p>Mon–Sat, 09:00 am – 08:00 pm</p>
                            <a
                                href="https://wa.me/917730019572"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-4 bg-[#25D366] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#1EBE5D] transition-colors shadow-sm"
                                aria-label="Chat with us on WhatsApp"
                            >
                                Chat on WhatsApp
                            </a>
                        </address>
                    </div>

                    {/* Col 4 */}
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/60 text-sm">
                        © {new Date().getFullYear()} Meezan Education Society. All Rights Reserved.
                    </p>
                    <a
                        href="https://a2slabs.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors group"
                    >
                        <Zap size={12} className="group-hover:text-[#F5A623] transition-colors" />
                        Designed & Developed by A2S Labs
                    </a>
                </div>
            </div>
        </footer>
    );
}
