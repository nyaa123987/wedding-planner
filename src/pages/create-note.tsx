'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { ArrowLeft } from 'lucide-react';

const CreateNotePage = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const session = useSession();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('Title and content cannot be empty.');
      return;
    }

    setLoading(true);

    const { error: insertError } = await supabase.from('notes').insert([
      {
        title: title.trim(),
        content: content.trim(),
      },
    ]);

    setLoading(false);

    if (insertError) {
      setError('Failed to save note: ' + insertError.message);
    } else {
      router.push('/notes');
    }
  };

  return (
    <div className="relative min-h-screen p-6 bg-white">
      <button
        onClick={() => router.push('/notes')}
        className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-200"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <h1 className="text-3xl font-bold text-center mb-6">Add a New Note</h1>

      <div className="max-w-xl mx-auto space-y-4">
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          placeholder="Note content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Note'}
        </button>
      </div>
    </div>
  );
};

export default CreateNotePage;
