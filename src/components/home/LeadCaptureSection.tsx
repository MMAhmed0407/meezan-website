"use client";

import { motion } from "framer-motion";

export default function LeadCaptureSection() {
    return (
        <section className="py-20 bg-gradient-to-r from-brand-teal to-brand-dark-teal text-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-white text-3xl md:text-5xl mb-4">Ready to Take the First Step?</h2>
                    <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                        Book a free 30-minute consultation with our experts today. No commitment required.
                    </p>

                    <form className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto justify-center" onSubmit={(e) => { e.preventDefault(); alert('Lead captured successfully!'); }}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            required
                            className="flex-1 px-5 py-4 rounded-full text-foreground bg-white placeholder:text-foreground/50 focus:outline-none focus:ring-4 focus:ring-white/30"
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            required
                            className="flex-1 px-5 py-4 rounded-full text-foreground bg-white placeholder:text-foreground/50 focus:outline-none focus:ring-4 focus:ring-white/30"
                        />
                        <button
                            type="submit"
                            className="px-8 py-4 rounded-full bg-brand-deeper-teal text-white font-semibold hover:bg-white hover:text-brand-deeper-teal border-2 border-transparent hover:border-white transition-all shadow-lg min-w-[200px]"
                        >
                            Book Now
                        </button>
                    </form>

                    <p className="text-sm text-white/80 mt-6">
                        Or WhatsApp us directly at <a href="https://wa.me/917730019572" className="underline font-semibold hover:text-white transition-colors">+91 77300 19572</a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
