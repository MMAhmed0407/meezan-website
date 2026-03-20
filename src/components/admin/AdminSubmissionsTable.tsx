'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { updateSubmissionStatus, deleteSubmission } from '@/app/actions/admin-data';
import {
    Trash2, ChevronDown, ChevronUp, AlertCircle, Mail, Loader2,
    Search, Filter, ChevronLeft, ChevronRight, LayoutList, LayoutGrid,
    Phone, BookOpen, CalendarDays
} from 'lucide-react';

type Submission = {
    id: string;
    createdAt: Date;
    fullName: string;
    email: string;
    phone: string | null;
    course: string | null;
    message: string;
    source: string;
    status: string;
};

const STATUS_OPTIONS = ['new', 'reached', 'replied', 'closed'];

const getStatusStyles = (status: string) => {
    switch (status) {
        case 'new': return 'bg-gray-100 text-gray-800 border-gray-200 focus:ring-gray-400';
        case 'reached': return 'bg-blue-50 text-blue-700 border-blue-200 focus:ring-blue-400';
        case 'replied': return 'bg-green-50 text-green-700 border-green-200 focus:ring-green-400';
        case 'closed': return 'bg-red-50 text-red-700 border-red-200 focus:ring-red-400';
        default: return 'bg-white text-gray-700 border-gray-300 focus:ring-primary';
    }
};

export default function AdminSubmissionsTable({ initialSubmissions }: { initialSubmissions: Submission[] }) {
    const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [replyingId, setReplyingId] = useState<string | null>(null);
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
    const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

    // Modal states
    const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [errorModal, setErrorModal] = useState<string | null>(null);

    // Filter & Pagination states
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    // Derived state for filtering
    const filteredSubmissions = useMemo(() => {
        return submissions.filter(sub => {
            const matchesSearch =
                sub.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (sub.phone && sub.phone.includes(searchQuery)) ||
                (sub.course && sub.course.toLowerCase().includes(searchQuery.toLowerCase())) ||
                sub.message.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [submissions, searchQuery, statusFilter]);

    // Resets to page 1 when typing in search or changing filter
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusFilter]);

    // Derived state for pagination
    const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
    const paginatedSubmissions = filteredSubmissions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    async function handleStatusChange(id: string, newStatus: string) {
        setUpdatingId(id);
        const result = await updateSubmissionStatus(id, newStatus);

        if (result.success) {
            setSubmissions(prev =>
                prev.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub)
            );
        } else {
            setErrorModal('Failed to update status: ' + result.error);
        }
        setUpdatingId(null);
    }

    async function handleDelete(id: string) {
        setIsDeleting(true);
        const result = await deleteSubmission(id);

        if (result.success) {
            setSubmissions(prev => prev.filter(sub => sub.id !== id));
            setDeleteModalId(null);
        } else {
            setErrorModal('Failed to delete submission: ' + result.error);
        }
        setIsDeleting(false);
    }

    const toggleRow = (id: string, e: React.MouseEvent) => {
        if ((e.target as HTMLElement).tagName === 'SELECT' || (e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('button')) {
            return;
        }
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedRows(newExpanded);
    };

    /* ─────────────── Reply helper ─────────────── */
    const replyHref = (sub: Submission) =>
        `mailto:${sub.email}?subject=${encodeURIComponent('Re: Your Inquiry at Meezan Educational Institute')}&body=${encodeURIComponent(`Hi ${sub.fullName},\n\nThank you for reaching out to Meezan Educational Institute regarding ${sub.course || 'our programs'}.\n\n[Your message here]\n\nBest regards,\nMeezan Educational Institute`)}`;

    /* ─────────────── Card View ─────────────── */
    const CardView = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
            {paginatedSubmissions.length === 0 ? (
                <div className="col-span-full py-12 text-center text-gray-500">
                    <div className="flex justify-center mb-3 text-gray-400"><Search size={32} /></div>
                    <p className="text-base font-medium text-gray-900 mb-1">No submissions found</p>
                    <p className="text-sm">We couldn't find anything matching your current filters.</p>
                </div>
            ) : (
                paginatedSubmissions.map((sub) => {
                    const isExpanded = expandedRows.has(sub.id);
                    return (
                        <div
                            key={sub.id}
                            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col gap-3 p-4"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                    <p className="font-bold text-gray-900 text-sm truncate">{sub.fullName}</p>
                                    <p className="text-xs text-gray-500 truncate">{sub.email}</p>
                                </div>
                                <select
                                    value={sub.status}
                                    onChange={(e) => handleStatusChange(sub.id, e.target.value)}
                                    disabled={updatingId === sub.id}
                                    className={`shrink-0 px-2 py-1 border rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all outline-none cursor-pointer disabled:opacity-50 appearance-none text-center ${getStatusStyles(sub.status)}`}
                                >
                                    {STATUS_OPTIONS.map(s => (
                                        <option key={s} value={s} className="bg-white text-gray-900 normal-case">{s}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Meta */}
                            <div className="flex flex-col gap-1 text-xs text-gray-500">
                                {sub.phone && (
                                    <div className="flex items-center gap-1.5">
                                        <Phone className="w-3 h-3 shrink-0" />
                                        <span>{sub.phone}</span>
                                    </div>
                                )}
                                {sub.course && (
                                    <div className="flex items-center gap-1.5">
                                        <BookOpen className="w-3 h-3 shrink-0" />
                                        <span className="truncate">{sub.course}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1.5">
                                    <CalendarDays className="w-3 h-3 shrink-0" />
                                    <span suppressHydrationWarning>{new Date(sub.createdAt).toLocaleDateString('en-GB')}</span>
                                </div>
                            </div>

                            {/* Message toggle */}
                            <button
                                onClick={() => {
                                    const newExpanded = new Set(expandedRows);
                                    if (newExpanded.has(sub.id)) newExpanded.delete(sub.id);
                                    else newExpanded.add(sub.id);
                                    setExpandedRows(newExpanded);
                                }}
                                className="text-left text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors"
                            >
                                {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                {isExpanded ? 'Hide message' : 'Show message'}
                            </button>
                            {isExpanded && (
                                <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-700 whitespace-pre-wrap border border-gray-200">
                                    <p className="font-semibold text-gray-400 uppercase text-[10px] mb-1">Message</p>
                                    {sub.message}
                                    <p className="mt-2 text-[10px] text-gray-400">Source: {sub.source.replace('_', ' ')}</p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                                <a
                                    href={replyHref(sub)}
                                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-100 ${replyingId === sub.id ? 'opacity-75 pointer-events-none' : ''}`}
                                    onClick={() => { setReplyingId(sub.id); setTimeout(() => setReplyingId(null), 1000); }}
                                >
                                    {replyingId === sub.id ? <Loader2 size={13} className="animate-spin" /> : <Mail size={13} />}
                                    Reply
                                </a>
                                <button
                                    onClick={() => setDeleteModalId(sub.id)}
                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent"
                                    title="Delete"
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );

    /* ─────────────── Table View ─────────────── */
    const TableView = () => (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-4 w-10"></th>
                        <th scope="col" className="px-6 py-4">Date</th>
                        <th scope="col" className="px-6 py-4">Name</th>
                        <th scope="col" className="px-6 py-4">Contact</th>
                        <th scope="col" className="px-6 py-4">Course</th>
                        <th scope="col" className="px-6 py-4">Status</th>
                        <th scope="col" className="px-6 py-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedSubmissions.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                <div className="flex justify-center mb-3 text-gray-400"><Search size={32} /></div>
                                <p className="text-base font-medium text-gray-900 mb-1">No submissions found</p>
                                <p className="text-sm">We couldn't find anything matching your current filters.</p>
                            </td>
                        </tr>
                    ) : (
                        paginatedSubmissions.map((sub) => (
                            <React.Fragment key={sub.id}>
                                <tr
                                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${expandedRows.has(sub.id) ? 'bg-gray-50' : 'bg-white'}`}
                                    onClick={(e) => toggleRow(sub.id, e)}
                                >
                                    <td className="px-6 py-4 text-gray-400">
                                        {expandedRows.has(sub.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600" suppressHydrationWarning>
                                        {new Date(sub.createdAt).toLocaleDateString('en-GB')}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{sub.fullName}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-gray-700">{sub.email}</div>
                                        <div className="text-xs text-gray-500">{sub.phone || 'N/A'}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {sub.course || <span className="text-gray-400">None</span>}
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={sub.status}
                                            onChange={(e) => handleStatusChange(sub.id, e.target.value)}
                                            disabled={updatingId === sub.id}
                                            className={`px-3 py-1.5 border rounded-lg text-xs font-semibold uppercase tracking-wider transition-all outline-none cursor-pointer disabled:opacity-50 appearance-none text-center ${getStatusStyles(sub.status)}`}
                                        >
                                            {STATUS_OPTIONS.map(status => (
                                                <option key={status} value={status} className="bg-white text-gray-900 normal-case">{status}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center items-center gap-3">
                                            <a
                                                href={replyHref(sub)}
                                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors border border-blue-100 ${replyingId === sub.id ? 'opacity-75 pointer-events-none' : ''}`}
                                                title="Reply to Submission"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setReplyingId(sub.id);
                                                    setTimeout(() => setReplyingId(null), 1000);
                                                }}
                                            >
                                                {replyingId === sub.id ? <Loader2 size={14} className="animate-spin" /> : <Mail size={14} />}
                                                {replyingId === sub.id ? 'Loading...' : 'Reply'}
                                            </a>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setDeleteModalId(sub.id); }}
                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent"
                                                title="Delete Submission"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {expandedRows.has(sub.id) && (
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <td colSpan={7} className="px-6 py-6">
                                            <div className="bg-white p-4 rounded-xl border border-gray-200 text-gray-700 shadow-sm relative">
                                                <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">Message</h4>
                                                <p className="whitespace-pre-wrap">{sub.message}</p>
                                                <div className="absolute top-4 right-4 text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                                                    Source: {sub.source.replace('_', ' ')}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden text-gray-900 relative">

            {/* Filters Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-5 border-b border-gray-200 bg-gray-50/50">
                <div className="relative w-full sm:w-1/3 min-w-[250px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search by name, email, phone, or message..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 bg-white shadow-sm"
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="bg-white p-2 border border-gray-300 rounded-lg shadow-sm text-gray-500">
                        <Filter size={16} />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full sm:w-auto px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white shadow-sm min-w-[150px] font-medium"
                    >
                        <option value="all">All Statuses</option>
                        {STATUS_OPTIONS.map(status => (
                            <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                        ))}
                    </select>

                    {/* View toggle — desktop only */}
                    <div className="hidden md:flex items-center gap-1 ml-2">
                        <button
                            onClick={() => setViewMode('table')}
                            title="Table view"
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'table' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'}`}
                        >
                            <LayoutList size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode('card')}
                            title="Card view"
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'card' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'}`}
                        >
                            <LayoutGrid size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile: always cards; Desktop: respect viewMode */}
            <div className="md:hidden">
                <CardView />
            </div>
            <div className="hidden md:block">
                {viewMode === 'table' ? <TableView /> : <CardView />}
            </div>

            {/* Pagination Footer */}
            {totalPages > 0 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50 text-sm">
                    <div className="text-gray-500">
                        Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredSubmissions.length)}</span> of <span className="font-semibold text-gray-900">{filteredSubmissions.length}</span> results
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white shadow-sm"
                            aria-label="Previous page"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <span className="font-medium text-gray-700 mx-2">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white shadow-sm"
                            aria-label="Next page"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {deleteModalId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border border-gray-100">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-red-100 text-red-600 p-3 rounded-full shrink-0">
                                <AlertCircle size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Delete Submission</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Are you sure you want to delete this submission? This action cannot be undone and will permanently remove the data from the database.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteModalId(null)}
                                disabled={isDeleting}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteModalId)}
                                disabled={isDeleting}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors disabled:opacity-50"
                            >
                                {isDeleting ? 'Deleting...' : 'Delete Permanently'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Modal */}
            {errorModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-gray-100">
                        <div className="flex flex-col items-center text-center px-4 mb-6">
                            <div className="bg-red-100 text-red-600 p-3 rounded-full mb-4">
                                <AlertCircle size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Error Occurred</h3>
                            <p className="text-sm text-gray-500">{errorModal}</p>
                        </div>
                        <button
                            onClick={() => setErrorModal(null)}
                            className="w-full px-4 py-3 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors"
                        >
                            Acknowledge
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
