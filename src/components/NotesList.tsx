'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import NoteCard from './NoteCard';
import ViewNote from './ViewNote';
import NoteModal from './NoteModal';

type Note = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
};

const NotesList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [viewingNote, setViewingNote] = useState<Note | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchNotes = async () => {
    const { data } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });
    setNotes(data || []);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="p-6">
      <button
        onClick={() => setShowModal(true)}
        className="mb-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        + Add Note
      </button>

      <div className="flex flex-wrap gap-4">
        {notes.map((note) => (
          <div key={note.id} onClick={() => setViewingNote(note)}>
            <NoteCard note={note} />
          </div>
        ))}
      </div>

      {showModal && (
        <NoteModal
          onClose={() => setShowModal(false)}
          onSave={() => {
            fetchNotes();
            setShowModal(false);
          }}
        />
      )}

      {viewingNote && (
        <ViewNote
          note={viewingNote}
          onClose={() => setViewingNote(null)}
          onSave={fetchNotes}
        />
      )}
    </div>
  );
};

export default NotesList;
