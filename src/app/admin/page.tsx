import { checkAuth, logoutAdmin } from '@/app/actions/admin-auth';
import { getSubmissions } from '@/app/actions/admin-data';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import AdminSubmissionsTable from '@/components/admin/AdminSubmissionsTable';
import Image from 'next/image';
import Link from 'next/link';

export default async function AdminPage() {
    const isAuth = await checkAuth();

    if (!isAuth) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col">
                <main className="flex-1 flex items-center justify-center p-4">
                    <AdminLoginForm />
                </main>
            </div>
        );
    }

    const submissions = await getSubmissions();

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* Minimal Admin Header */}
            <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="relative w-[100px] h-8 sm:h-10">
                            <Image
                                src="/images/meezan-logo.png"
                                alt="Meezan Educational Institute"
                                fill
                                className="object-contain"
                                priority
                            />
                        </Link>
                        <span className="text-sm font-medium text-gray-500 border-l border-gray-200 pl-4">
                            Admin Dashboard
                        </span>
                    </div>
                    <form action={logoutAdmin}>
                        <button
                            type="submit"
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100"
                        >
                            Sign out
                        </button>
                    </form>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Contact Submissions</h1>
                    <p className="mt-2 text-gray-600">
                        Manage all leads from the contact forms. Total: {submissions.length}
                    </p>
                </div>

                <AdminSubmissionsTable initialSubmissions={submissions} />
            </main>
        </div>
    );
}
