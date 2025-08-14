import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

type Note = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
};

type ViewNoteProps = {
  note: Note;
  onClose: () => void;
};

const ViewNote = ({ note, onClose }: ViewNoteProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = async () => {
    await supabase
      .from('notes')
      .update({ title, content })
      .eq('id', note.id);

    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 p-6 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        {isEditing ? (
          <input
            type="text"
            className="text-2xl font-bold border-b border-gray-300 focus:outline-none w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="text-2xl font-bold">{note.title}</h1>
        )}

        <button
          onClick={onClose}
          className="text-2xl font-bold px-4 py-2 text-gray-600 hover:text-black"
        >
          ×
        </button>
      </div>

      {isEditing ? (
        <textarea
          className="w-full min-h-[300px] bg-gray-100 p-4 rounded-md resize-y focus:outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <p className="whitespace-pre-wrap text-gray-800 mb-6">{note.content}</p>
      )}

      <p className="text-sm text-gray-500 mb-4">
        Created: {new Date(note.created_at).toLocaleString()}
      </p>

      <div className="flex gap-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setTitle(note.title);
                setContent(note.content);
              }}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default ViewNote;
