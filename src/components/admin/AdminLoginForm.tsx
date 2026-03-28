'use client';

import { useState } from 'react';
import { loginAdmin } from '@/app/actions/admin-auth';
import Image from 'next/image';

interface AdminLoginFormProps {
    onSuccess?: () => void;
}

export default function AdminLoginForm({ onSuccess }: AdminLoginFormProps) {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const result = await loginAdmin(email, password);
        if (result?.error) {
            setError(result.error);
            setIsLoading(false);
        } else {
            onSuccess?.();
        }
    }

    return (
        <div className="min-h-screen w-full flex bg-[#F4F7FB]" style={{ colorScheme: 'light' }}>
            {/* Left decorative panel */}
            <div className="hidden lg:flex lg:w-[45%] bg-[#0B5E65] flex-col items-center justify-center px-16 relative overflow-hidden">
                {/* Soft circle accents */}
                <div className="absolute top-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full bg-[#29B8C1]/20" />
                <div className="absolute bottom-[-60px] right-[-60px] w-[280px] h-[280px] rounded-full bg-[#29B8C1]/10" />

                <div className="relative z-10 text-center">
                    <div className="bg-white rounded-2xl px-6 py-4 inline-block mb-10 shadow-xl">
                        <div className="relative w-[160px] h-[62px]">
                            <Image src="/images/meezan-logo.png" alt="Meezan Educational Institute" fill className="object-contain" priority />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-3 leading-snug">
                        Meezan Admin Portal
                    </h2>
                    <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                        Securely manage contact submissions, blog posts, and institute settings.
                    </p>
                </div>
            </div>

            {/* Right login panel */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-sm">
                    {/* Logo — mobile only */}
                    <div className="lg:hidden flex justify-center mb-8">
                        <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
                            <div className="relative w-[130px] h-[50px]">
                                <Image src="/images/meezan-logo.png" alt="Meezan Educational Institute" fill className="object-contain" priority />
                            </div>
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign in</h1>
                    <p className="text-sm text-gray-500 mb-8">Enter your credentials to access the dashboard</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoFocus
                                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 text-sm outline-none focus:border-[#29B8C1] focus:ring-2 focus:ring-[#29B8C1]/20 transition-all placeholder-gray-300"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="w-full px-4 py-3 pr-11 rounded-xl bg-white border border-gray-200 text-gray-900 text-sm outline-none focus:border-[#29B8C1] focus:ring-2 focus:ring-[#29B8C1]/20 transition-all placeholder-gray-300"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    onClick={() => setShowPassword(v => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-[#0B5E65] hover:bg-[#29B8C1] transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Signing in...
                                </span>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center text-gray-400 text-xs mt-8">
                        Restricted to authorised personnel only
                    </p>
                </div>
            </div>
        </div>
    );
}
