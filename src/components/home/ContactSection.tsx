"use client";

import { submitContactForm } from "@/app/actions/contact";
import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, MessageSquare, CheckCircle2, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

function ContactSectionInner() {
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [submitError, setSubmitError] = useState("");
    const searchParams = useSearchParams();

    useEffect(() => {
        // useSearchParams only works for ?params before the hash.
        // nothing
        // For /#enquiry-form?course=... we need to parse the hash.
        const hash = window.location.hash;
        let course = searchParams.get("course");

        if (!course && hash.includes("?")) {
            const hashParts = hash.split("?");
            const queryParams = new URLSearchParams(hashParts[1]);
            course = queryParams.get("course");
        }

        if (course) {
            const courseLower = course.toLowerCase().trim();
            // Expanded mapping for specific course names to categories
            if (
                courseLower.includes("health") ||
                courseLower.includes("paramedic") ||
                courseLower.includes("nurse") ||
                courseLower.includes("tech") ||
                courseLower.includes("midwifery") ||
                courseLower.includes("hospital") ||
                courseLower.includes("dialysis") ||
                courseLower.includes("dental") ||
                courseLower.includes("respiratory")
            ) {
                setSelectedCourse("health");
            } else if (courseLower.includes("psychology")) {
                setSelectedCourse("psychology");
            } else if (
                courseLower.includes("management") ||
                courseLower.includes("brand") ||
                courseLower.includes("incubation") ||
                courseLower.includes("operations") ||
                courseLower.includes("startup") ||
                courseLower.includes("strategic") ||
                courseLower.includes("financial")
            ) {
                setSelectedCourse("management");
            } else if (
                courseLower.includes("coaching") ||
                courseLower.includes("counsel") ||
                courseLower.includes("development") ||
                courseLower.includes("teacher") ||
                courseLower.includes("ecce") ||
                courseLower.includes("asd") ||
                courseLower.includes("adhd") ||
                courseLower.includes("fdp") ||
                courseLower.includes("ldp")
            ) {
                setSelectedCourse("coaching");
            } else if (
                courseLower.includes("it") ||
                courseLower.includes("data") ||
                courseLower.includes("python") ||
                courseLower.includes("excel") ||
                courseLower.includes("tableau") ||
                courseLower.includes("project")
            ) {
                setSelectedCourse("it");
            } else {
                setSelectedCourse("other");
            }
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const result = await submitContactForm(formData, 'contact_section');

        setIsSubmitting(false);
        if (!result.success) {
            setSubmitError(result.error || 'Something went wrong. Please try again.');
            setIsSubmitting(false);
            return;
        }

        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 5000);
    };

    return (
        <section className="py-8 md:py-10 bg-white" id="contact" aria-labelledby="contact-heading">
            <div id="enquiry-form" className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">

                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">

                    {/* Left Column (Info & Map) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 id="contact-heading" className="mb-4 text-2xl md:text-3xl lg:text-4xl text-brand-deeper-teal">Get In Touch</h2>
                        <p className="text-foreground/70 text-base md:text-lg mb-6">We're here to answer your questions and help you build your future. Reach out to us today.</p>

                        <address className="not-italic space-y-4 mb-6">
                            <div className="flex gap-4">
                                <div className="bg-brand-light p-3 rounded-full text-brand-teal h-fit shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div className="not-italic">
                                    <h4 className="font-semibold text-brand-deeper-teal mb-1 text-lg">Our Location</h4>
                                    <p className="text-foreground/70">201, Second Floor, Dorato Avenue<br />Hyderabad, India</p>
                                    <a href="https://maps.app.goo.gl/uX3L3bQXWq5y5b5x9" target="_blank" rel="noopener noreferrer" className="text-brand-teal text-sm font-semibold mt-2 inline-block hover:underline">Get Directions</a>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-brand-light p-3 rounded-full text-brand-teal h-fit shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div className="not-italic">
                                    <h4 className="font-semibold text-brand-deeper-teal mb-1 text-lg">Phone Numbers</h4>
                                    <p className="text-foreground/70 mb-2">Before visiting please call us at:</p>
                                    <p className="font-medium hover:text-brand-teal transition-colors"><a href="tel:+917730019572" aria-label="Call +91 77300 19572">+91 77300 19572</a></p>
                                    <p className="font-medium hover:text-brand-teal transition-colors"><a href="tel:+919010186447" aria-label="Call +91 9010186447">+91 9010186447</a></p>
                                    <p className="font-medium hover:text-brand-teal transition-colors"><a href="tel:04045131341" aria-label="Call 040-45131341">040-45131341</a></p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-brand-light p-3 rounded-full text-brand-teal h-fit shrink-0">
                                    <Clock size={24} />
                                </div>
                                <div className="not-italic">
                                    <h4 className="font-semibold text-brand-deeper-teal mb-1 text-lg">Working Hours</h4>
                                    <p className="text-foreground/70">Monday – Saturday</p>
                                    <p className="font-medium text-foreground">09:00 AM – 08:00 PM</p>
                                </div>
                            </div>
                        </address>

                        <div className="flex gap-4">
                            <a href="https://wa.me/917730019572" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1ebe5d] transition-colors shadow-sm" aria-label="Chat with us on WhatsApp">
                                <MessageSquare size={18} /> WhatsApp Us
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Column (Form) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-black/5 relative overflow-hidden">
                            <h3 className="text-xl md:text-2xl mb-4 text-brand-deeper-teal">Send Us a Message</h3>

                            {submitSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-12 text-center"
                                >
                                    <div className="bg-green-100 text-green-600 p-4 rounded-full mb-4">
                                        <CheckCircle2 size={48} />
                                    </div>
                                    <h4 className="text-2xl font-semibold mb-2 text-brand-deeper-teal">Message Sent!</h4>
                                    <p className="text-foreground/70">Thank you for reaching out. We will get back to you shortly.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-brand-deeper-teal mb-1.5">Full Name</label>
                                        <input type="text" name="full_name" required className="w-full bg-brand-light border-0 px-4 py-3.5 rounded-xl focus:ring-2 focus:ring-brand-teal outline-none transition-all placeholder:text-foreground/40" placeholder="John Doe" onChange={() => { if (submitError) setSubmitError('') }} />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-brand-deeper-teal mb-1.5">Email Address</label>
                                            <input type="email" name="email" required className="w-full bg-brand-light border-0 px-4 py-3.5 rounded-xl focus:ring-2 focus:ring-brand-teal outline-none transition-all placeholder:text-foreground/40" placeholder="john@example.com" onChange={() => { if (submitError) setSubmitError('') }} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-brand-deeper-teal mb-1.5">Phone Number</label>
                                            <input type="tel" name="phone" required className="w-full bg-brand-light border-0 px-4 py-3.5 rounded-xl focus:ring-2 focus:ring-brand-teal outline-none transition-all placeholder:text-foreground/40" placeholder="+91 0000 00000" onChange={() => { if (submitError) setSubmitError('') }} />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-brand-deeper-teal mb-1.5">Course of Interest</label>
                                        <div className="relative">
                                            <select
                                                name="course"
                                                required
                                                value={selectedCourse}
                                                onChange={(e) => {
                                                    setSelectedCourse(e.target.value);
                                                    if (submitError) setSubmitError('');
                                                }}
                                                className="w-full bg-brand-light border-0 px-4 py-3.5 rounded-xl focus:ring-2 focus:ring-brand-teal outline-none transition-all appearance-none text-foreground/80"
                                            >
                                                <option value="" disabled>Select a category</option>
                                                <option value="health">Paramedic & Health Services</option>
                                                <option value="psychology">Psychology</option>
                                                <option value="management">Management Training</option>
                                                <option value="coaching">Coaching Services</option>
                                                <option value="other">Other / General Inquiry</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-deeper-teal">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-brand-deeper-teal mb-1.5">Your Message</label>
                                        <textarea required name="message" rows={4} className="w-full bg-brand-light border-0 px-4 py-3.5 rounded-xl focus:ring-2 focus:ring-brand-teal outline-none transition-all placeholder:text-foreground/40 resize-none" placeholder="How can we help you?" onChange={() => { if (submitError) setSubmitError('') }}></textarea>
                                    </div>

                                        {submitError && (
                                            <div className="w-full rounded-lg bg-red-50 border border-red-200 px-4 py-3 sm:px-5 sm:py-4 mt-3 mb-3 animate-fade-in">
                                                <p className="text-sm text-red-600 text-center font-medium leading-relaxed">
                                                    {submitError}
                                                </p>
                                            </div>
                                        )}

                                        {!submitSuccess && (
                                            <button type="submit" disabled={isSubmitting} className="w-full h-12 bg-brand-teal text-white rounded-xl font-semibold text-lg hover:bg-brand-dark-teal hover:shadow-lg transition-all hover:-translate-y-0.5 mt-2 disabled:opacity-75 disabled:hover:translate-y-0 flex items-center justify-center gap-2">
                                                {isSubmitting ? <><Loader2 className="animate-spin" size={24} /> Sending...</> : 'Send Message'}
                                            </button>
                                        )}
                                </form>
                            )}
                        </div>
                    </motion.div>

                </div>

                {/* Map iframe - Placeholder Location Hyderabad Setup */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-12 w-full h-[350px] rounded-3xl overflow-hidden shadow-md border border-border bg-brand-light"
                >
                    <iframe
                        src="https://www.google.com/maps?q=Dorato+Avenue,+Hyderabad,+Telangana,+India&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </motion.div>
            </div>
        </section>
    );
}

export default function ContactSection() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ContactSectionInner />
        </Suspense>
    );
}
