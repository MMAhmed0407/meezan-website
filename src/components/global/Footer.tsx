import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter, Zap } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-brand-dark-teal text-white pt-16 pb-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Col 1 */}
                    <div>
                        <div className="flex items-center gap-1 mb-6">
                            <div className="bg-white rounded-lg px-3 py-2 inline-block relative shadow-sm">
                                <div className="relative w-[180px] h-[70px]">
                                    <Image
                                        src="/images/meezan-logo.png"
                                        alt="Meezan Educational Institute"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                        <p className="text-white/80 mb-6 max-w-sm">
                            Encourage to Educate to Empower. Transforming lives through quality education and professional training.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/share/166FToduKR/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-brand-teal transition-colors" aria-label="Facebook">
                                <Facebook size={20} />
                            </a>
                            <a href="https://instagram.com/meezan_institute" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-brand-teal transition-colors" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="https://linkedin.com/company/meezan-institute" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-brand-teal transition-colors" aria-label="LinkedIn">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://twitter.com/meezan_inst" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-brand-teal transition-colors" aria-label="Twitter">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Col 2 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white border-b border-white/20 pb-2 inline-block">Quick Links</h3>
                        <ul className="space-y-4">
                            {['Home', 'Courses', 'About', 'Blog', 'Contact'].map((link) => (
                                <li key={link}>
                                    <Link href={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="text-white/80 hover:text-brand-teal transition-colors inline-block text-sm">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white border-b border-white/20 pb-2 inline-block">Contact Us</h3>
                        <address className="not-italic text-white/80 space-y-4 text-sm">
                            <p>201, Second Floor, Dorato Avenue,<br />Hyderabad, India</p>
                            <div className="space-y-2">
                                <p><a href="tel:+917730019572" className="hover:text-brand-teal transition-colors">+91 77300 19572</a></p>
                                <p><a href="tel:+919010186447" className="hover:text-brand-teal transition-colors">+91 9010186447</a></p>
                                <p><a href="tel:+914045131341" className="hover:text-brand-teal transition-colors">040 45131341</a></p>
                            </div>
                            <p>Mon–Sat, 09:00 am – 08:00 pm</p>
                            <a
                                href="https://wa.me/917730019572"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-4 bg-[#25D366] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#1EBE5D] transition-colors shadow-sm"
                            >
                                Chat on WhatsApp
                            </a>
                        </address>
                    </div>

                    {/* Col 4 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white border-b border-white/20 pb-2 inline-block">Newsletter</h3>
                        <p className="text-white/80 mb-4 text-sm leading-relaxed">Get 10% off your first course by subscribing to our newsletter.</p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-white/10 border border-white/20 text-white placeholder:text-white/50 px-4 py-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-brand-teal text-white px-4 py-3 rounded-md text-sm font-semibold hover:bg-brand-dark-teal transition-colors shadow-sm"
                            >
                                Subscribe Now
                            </button>
                        </form>
                    </div>
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
