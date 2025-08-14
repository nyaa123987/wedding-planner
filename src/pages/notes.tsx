import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import { useUser } from '@supabase/auth-helpers-react';
import NoteCard from '../components/NoteCard';
import { Plus, ArrowLeft } from 'lucide-react';
import H1 from '../components/Heading1';

type Note = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
};

const NotesPage = () => {
  const user = useUser();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (user) fetchNotes();
  }, [user]);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setNotes(data as Note[]);
    } else {
      console.error('Error fetching notes:', error);
    }
  };

  const handleAddNote = () => {
    // You can open a modal or navigate to a create-note page
    router.push('/create-note'); // or toggle modal
  };

  return (
    <div className="relative p-8 min-h-screen bg-white">
      {/* Back Arrow */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-200"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Heading */}
      <H1>My Notes</H1>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>

      {/* Add Note Button */}
      <button
        onClick={handleAddNote}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default NotesPage;
