import { useState } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from '../lib/supabaseClient';

type NoteModalProps = {
  onClose: () => void;
  onSave: () => void;
};

const NoteModal = ({ onClose, onSave }: NoteModalProps) => {
  const user = useUser();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!title.trim() || !user) return;

    await supabase.from('notes').insert([
      {
        user_id: user.id,
        title,
        content,
        created_at: new Date().toISOString(),
      },
    ]);

    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white z-50 p-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-100 rounded text-xl"
      />
      <textarea
        placeholder="Note"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 h-60 bg-gray-100 rounded resize-y"
      />
      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-500 text-white px-6 py-2 rounded"
      >
        Done
      </button>
    </div>
  );
};

export default NoteModal;
