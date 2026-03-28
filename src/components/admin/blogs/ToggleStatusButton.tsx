'use client';

import { useState } from 'react';
import { toggleBlogStatus } from '@/app/actions/blog-actions';
import { toast } from 'sonner';

interface ToggleStatusButtonProps {
  id: string;
  currentStatus: string;
}

export default function ToggleStatusButton({ id, currentStatus }: ToggleStatusButtonProps) {
  const [status, setStatus] = useState(currentStatus);
  const [isPending, setIsPending] = useState(false);
  const isPublished = status === 'published';

  const handleToggle = async () => {
    setIsPending(true);
    const newStatus = isPublished ? 'draft' : 'published';
    const result = await toggleBlogStatus(id, newStatus);
    if (result?.error) {
      toast.error(result.error);
    } else {
      setStatus(newStatus);
      toast.success(`Blog marked as ${newStatus}`);
    }
    setIsPending(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors min-w-[70px] ${
        isPublished 
          ? 'bg-green-100 text-green-700 hover:bg-green-200' 
          : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
      } disabled:opacity-50`}
    >
      {isPending ? '...' : isPublished ? 'Published' : 'Draft'}
    </button>
  );
}
