"use client";

import { useState, useEffect, useCallback } from "react";
import { Mail, X, CheckCircle2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type WidgetState = "collapsed" | "expanded" | "submitted";

export default function FloatingContact() {
    const [state, setState] = useState<WidgetState>("collapsed");
    const [selectedCourse, setSelectedCourse] = useState("");

    const openWidget = useCallback(() => {
        setState("expanded");
    }, []);

    // Listen for custom DOM event from other components (e.g. courses page CTAs)
    useEffect(() => {
        const handler = () => openWidget();
        window.addEventListener("open-contact-widget", handler);
        return () => window.removeEventListener("open-contact-widget", handler);
    }, [openWidget]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setState("submitted");
        setTimeout(() => {
            setState("collapsed");
            setSelectedCourse("");
        }, 3000);
    };

    const handleClose = () => {
        setState("collapsed");
        setSelectedCourse("");
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
                                                required
                                                className="w-full bg-brand-light border-0 px-3.5 py-2.5 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none transition-all placeholder:text-foreground/40 text-sm"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-brand-deeper-teal mb-1">Email</label>
                                                <input
                                                    type="email"
                                                    required
                                                    className="w-full bg-brand-light border-0 px-3.5 py-2.5 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none transition-all placeholder:text-foreground/40 text-sm"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-brand-deeper-teal mb-1">Phone</label>
                                                <input
                                                    type="tel"
                                                    required
                                                    className="w-full bg-brand-light border-0 px-3.5 py-2.5 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none transition-all placeholder:text-foreground/40 text-sm"
                                                    placeholder="+91 00000 00000"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-brand-deeper-teal mb-1">Course of Interest</label>
                                            <div className="relative">
                                                <select
                                                    value={selectedCourse}
                                                    onChange={(e) => setSelectedCourse(e.target.value)}
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
                                                rows={3}
                                                className="w-full bg-brand-light border-0 px-3.5 py-2.5 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none transition-all placeholder:text-foreground/40 resize-none text-sm"
                                                placeholder="How can we help you?"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-brand-teal text-white py-3 rounded-lg font-semibold text-sm hover:bg-brand-dark-teal hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                        >
                                            <Send size={16} />
                                            Send Message
                                        </button>
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
