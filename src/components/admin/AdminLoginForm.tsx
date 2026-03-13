'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/app/actions/admin-auth';

export default function AdminLoginForm() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const result = await loginAdmin(formData);

        if (result?.error) {
            setError(result.error);
            setIsLoading(false);
        } else {
            // Successful login, refresh to let the Server Component handle the verified cookie
            router.refresh();
        }
    }

    return (
        <div className="w-full max-w-md p-8 space-y-8 bg-white border border-gray-200 rounded-2xl shadow-xl relative z-10">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Admin Access</h2>
                <p className="mt-2 text-sm text-gray-500">Sign in to view contact submissions</p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="block w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                            placeholder="admin@gmail.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="block w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex justify-center w-full px-4 py-3 text-sm font-semibold text-white transition-all rounded-lg bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-white disabled:opacity-50"
                >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
            </form>
        </div>
    );
}
