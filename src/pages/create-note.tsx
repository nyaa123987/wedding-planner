import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import { useUser } from '@clerk/nextjs'; // ✅ Clerk instead of Supabase
import { ArrowLeft } from 'lucide-react';

const CreateNotePage = () => {
  const router = useRouter();
  const { user } = useUser(); // Clerk user object

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;

    if (!user?.id) {
      alert('User not authenticated. Please log in again.');
      return;
    }

    setLoading(true);

    console.log('Inserting note with user_id:', user.id);

    const { data, error } = await supabase
      .from('notes')
      .insert([
        {
          title,
          content,
          user_id: user.id, // Clerk user id stored in Supabase
        },
      ]);

    setLoading(false);

    if (!error) {
      console.log('Insert success:', data);
      router.push('/notes');
    } else {
      console.error('Insert error:', error);
      alert('Error saving note');
    }
  };

  if (!user) {
    return <div className="p-6 text-center">Loading...</div>;
  }

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
