'use client';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface DeleteBlogButtonProps {
  id: string;
  onDelete: (id: string) => Promise<void> | void;
}

export default function DeleteBlogButton({ id, onDelete }: DeleteBlogButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setIsPending(true);
      await onDelete(id);
      setIsPending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="p-1.5 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
      title="Delete Post"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
