"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Mail, X, CheckCircle2, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { submitContactForm } from "@/app/actions/contact";

type WidgetState = "collapsed" | "expanded" | "submitted";

export default function FloatingContact() {
    const [state, setState] = useState<WidgetState>("collapsed");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const contactRef = useRef<HTMLDivElement>(null);

    useOutsideClick(contactRef, () => {
        if (state === "expanded") setState("collapsed");
    }, state === "expanded");

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                setState("collapsed");
                setSelectedCourse("");
                setSubmitError("");
                setSubmitSuccess(false);
            }
        }
        if (state === "expanded") {
            document.addEventListener('keydown', onKey);
        }
        return () => document.removeEventListener('keydown', onKey);
    }, [state]);

    const openWidget = useCallback((courseName?: string) => {
        setState("expanded");
        if (courseName) {
            const courseLower = courseName.toLowerCase().trim();
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
                setSelectedCourse("paramedic");
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
                courseLower.includes("leadership") ||
                courseLower.includes("goal") ||
                courseLower.includes("public speaking") ||
                courseLower.includes("time management") ||
                courseLower.includes("creativity")
            ) {
                setSelectedCourse("coaching");
            } else if (
                courseLower.includes("teacher") ||
                courseLower.includes("ecce") ||
                courseLower.includes("pre-primary") ||
                courseLower.includes("asd") ||
                courseLower.includes("autism") ||
                courseLower.includes("life skills") ||
                courseLower.includes("adhd") ||
                courseLower.includes("fdp") ||
                courseLower.includes("ldp") ||
                courseLower.includes("faculty") ||
                courseLower.includes("educator")
            ) {
                setSelectedCourse("teachers-training");
            } else {
                setSelectedCourse("other");
            }
        }
    }, []);

    // Listen for custom DOM event from other components (e.g. courses page CTAs)
    useEffect(() => {
        const handler = (e: Event) => {
            const customEvent = e as CustomEvent;
            openWidget(customEvent.detail?.course);
        };
        window.addEventListener("open-contact-widget", handler as EventListener);
        return () => window.removeEventListener("open-contact-widget", handler as EventListener);
    }, [openWidget]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const result = await submitContactForm(formData, 'floating_widget');

        setIsSubmitting(false);
        if (!result.success) {
            setSubmitError(result.error || 'Something went wrong. Please try again.');
            setIsSubmitting(false);
            return;
        }

        setSubmitSuccess(true);
        setState("submitted");
        setTimeout(() => {
            setState("collapsed");
            setSelectedCourse("");
            setSubmitSuccess(false);
            setSubmitError("");
        }, 3000);
    };

    const handleClose = () => {
        setState("collapsed");
        setSelectedCourse("");
        setSubmitError("");
        setSubmitSuccess(false);
    };

    return (
        <>

            {/* Expanded Form / Submitted State */}
            <AnimatePresence>
                {(state === "expanded" || state === "submitted") && (
                    <>
                        {/* Backdrop on mobile */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/30 z-[55] md:hidden"
                            onClick={handleClose}
                        />

                        <motion.div
                            ref={contactRef}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="fixed bottom-4 right-4 z-[60] w-[calc(100vw-2rem)] sm:w-[380px] max-h-[calc(100vh-6rem)] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-border"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-brand-deeper-teal rounded-t-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="bg-brand-teal/30 p-2 rounded-full">
                                        <Mail size={18} className="text-white" />
                                    </div>
                                    <h3 className="text-white text-base font-semibold tracking-tight">
                                        {state === "submitted" ? "Thank You!" : "Get in Touch"}
                                    </h3>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                                    aria-label="Close contact form"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-5">
                                {state === "submitted" ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center py-8 text-center"
                                    >
                                        <div className="bg-green-100 text-green-600 p-3 rounded-full mb-3">
                                            <CheckCircle2 size={36} />
                                        </div>
                                        <h4 className="text-lg font-semibold mb-1 text-brand-deeper-teal">Message Sent!</h4>
                                        <p className="text-foreground/70 text-sm">We&apos;ll get back to you shortly.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium text-brand-deeper-teal mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                name="full_name"
                                                required
                                                className="w-full bg-brand-light border-0 px-3.5 py-2.5 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none transition-all placeholder:text-foreground/40 text-sm"
                                                placeholder="John Doe"
                                                onChange={() => { if (submitError) setSubmitError('') }}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-brand-deeper-teal mb-1">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    className="w-full bg-brand-light border-0 px-3.5 py-2.5 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none transition-all placeholder:text-foreground/40 text-sm"
                                                    placeholder="john@example.com"
                                                    onChange={() => { if (submitError) setSubmitError('') }}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-brand-deeper-teal mb-1">Phone</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    required
                                                    className="w-full bg-brand-light border-0 px-3.5 py-2.5 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none transition-all placeholder:text-foreground/40 text-sm"
                                                    placeholder="+91 00000 00000"
                                                    onChange={() => { if (submitError) setSubmitError('') }}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-brand-deeper-teal mb-1">Course of Interest</label>
                                            <div className="relative">
                                                <select
                                                    name="course"
                                                    value={selectedCourse}
                                                    onChange={(e) => {
                                                        setSelectedCourse(e.target.value);
                                                        if (submitError) setSubmitError('');
                                                    }}
                                                    className="w-full bg-brand-light border-0 px-3.5 py-2.5 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none transition-all appearance-none text-foreground/80 text-sm"
                                                >
                                                    <option value="">Select a category</option>
                                                    <option value="paramedic">Paramedic &amp; Health Services</option>
                                                    <option value="teachers-training">Teacher&apos;s Training</option>
                                                    <option value="psychology">Psychology</option>
                                                    <option value="management">Management Training</option>
                                                    <option value="coaching">Coaching Services</option>
                                                    <option value="other">Other / General Inquiry</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-brand-deeper-teal">
                                                    <svg className="fill-current h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-brand-deeper-teal mb-1">Message</label>
                                            <textarea
                                                required
                                                name="message"
                                                rows={3}
                                                className="w-full bg-brand-light border-0 px-3.5 py-2.5 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none transition-all placeholder:text-foreground/40 resize-none text-sm"
                                                placeholder="How can we help you?"
                                                onChange={() => { if (submitError) setSubmitError('') }}
                                            />
                                        </div>

                                        {submitError && (
                                            <div className="w-full rounded-lg bg-red-50 border border-red-200 px-4 py-3 mt-3 mb-3 animate-fade-in">
                                                <p className="text-sm text-red-600 text-center font-medium leading-relaxed">
                                                    {submitError}
                                                </p>
                                            </div>
                                        )}

                                        {submitSuccess && (
                                            <div className="w-full rounded-lg bg-green-50 border border-green-200 px-4 py-3 mt-3 mb-3 animate-fade-in">
                                                <p className="text-sm text-green-600 text-center font-medium leading-relaxed">
                                                    Message sent successfully! We will get back to you soon.
                                                </p>
                                            </div>
                                        )}

                                        {!submitSuccess && (
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full h-12 bg-brand-teal text-white rounded-lg font-semibold text-sm hover:bg-brand-dark-teal hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-75"
                                            >
                                                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                            </button>
                                        )}
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
