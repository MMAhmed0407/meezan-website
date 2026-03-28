'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { changePassword } from '@/app/actions/admin-auth';

function EyeIcon({ open }: { open: boolean }) {
    return open ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
        </svg>
    );
}

function PasswordInput({ name, placeholder, label, hint }: { name: string; placeholder: string; label: string; hint?: string }) {
    const [show, setShow] = useState(false);
    return (
        <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
                {label} {hint && <span className="text-gray-400 font-normal">{hint}</span>}
            </label>
            <div className="relative">
                <input
                    name={name}
                    type={show ? 'text' : 'password'}
                    required
                    minLength={name === 'oldPassword' ? 1 : 6}
                    className="w-full px-3 py-2.5 pr-10 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:border-[#29B8C1] focus:ring-2 focus:ring-[#29B8C1]/20 outline-none transition-all"
                    placeholder={placeholder}
                />
                <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShow(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <EyeIcon open={show} />
                </button>
            </div>
        </div>
    );
}

export default function AdminChangePasswordForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    function closeModal() {
        setIsOpen(false);
        setStatus(null);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setStatus(null);
        const formData = new FormData(e.currentTarget);
        const newPassword = (formData.get('newPassword') as string)?.trim();
        const confirmPassword = (formData.get('confirmPassword') as string)?.trim();

        if (!newPassword || !confirmPassword) {
            setStatus({ type: 'error', message: 'All fields are required.' });
            setIsLoading(false);
            return;
        }

        if (newPassword.length < 6) {
            setStatus({ type: 'error', message: 'New password must be at least 6 characters.' });
            setIsLoading(false);
            return;
        }

        if (newPassword !== confirmPassword) {
            setStatus({ type: 'error', message: 'New passwords do not match.' });
            setIsLoading(false);
            return;
        }

        const result = await changePassword(newPassword);
        setIsLoading(false);
        if (result.success) {
            setStatus({ type: 'success', message: 'Password updated successfully!' });
            (e.target as HTMLFormElement).reset();
            setTimeout(closeModal, 1200);
        } else {
            setStatus({ type: 'error', message: result.error ?? 'Something went wrong.' });
        }
    }

    return (
        <>
            {/* Trigger button */}
            <button
                id="change-password-btn"
                onClick={() => setIsOpen(true)}
                className="text-xs font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Change Password
            </button>

            {/* Modal */}
            {isOpen && createPortal(
                <div
                    className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
                >
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
                        {/* Modal header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#0D7A82]/10 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D7A82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-gray-900">Change Password</h2>
                                    <p className="text-xs text-gray-400">Update your admin password</p>
                                </div>
                            </div>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                            </button>
                        </div>

                        {/* Modal body */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <PasswordInput name="newPassword" label="New Password" hint="(min 6 characters)" placeholder="Enter new password" />
                            <PasswordInput name="confirmPassword" label="Confirm New Password" placeholder="Confirm new password" />

                            {status && (
                                <div className={`flex items-center gap-2 p-3 rounded-lg text-sm border ${
                                    status.type === 'success'
                                        ? 'bg-green-50 border-green-200 text-green-700'
                                        : 'bg-red-50 border-red-200 text-red-600'
                                }`}>
                                    {status.type === 'success'
                                        ? <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                        : <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                    }
                                    {status.message}
                                </div>
                            )}

                            <div className="flex gap-3 pt-1">
                                <button type="button" onClick={closeModal}
                                    className="flex-1 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" disabled={isLoading}
                                    className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0D7A82] hover:bg-[#29B8C1] transition-colors disabled:opacity-50">
                                    {isLoading ? 'Updating...' : 'Update Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            , document.body)}
        </>
    );
}
