import { useState } from 'react';

type Note = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
};

type NoteCardProps = {
  note: Note;
};

const NoteCard = ({ note }: NoteCardProps) => {
  const [showView, setShowView] = useState(false);

  return (
    <>
      {/* Note preview card */}
      <div
        onClick={() => setShowView(true)}
        className="bg-white rounded-md shadow-md p-4 cursor-pointer w-48 h-64 overflow-hidden relative hover:shadow-lg transition"
      >
        <h2 className="text-lg font-semibold truncate">{note.title}</h2>
        <p className="text-xs text-gray-500 absolute bottom-2 left-2 right-2 truncate">
          {new Date(note.created_at).toLocaleString()}
        </p>
      </div>

      {/* Fullscreen view */}
      {showView && (
        <div className="fixed inset-0 bg-white z-50 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{note.title}</h1>
            <button
              onClick={() => setShowView(false)}
              className="text-2xl font-bold px-4 py-2 text-gray-600 hover:text-black"
            >
              ×
            </button>
          </div>

          <div className="whitespace-pre-wrap text-gray-800 mb-6">
            {note.content}
          </div>

          <p className="text-sm text-gray-500">
            Created: {new Date(note.created_at).toLocaleString()}
          </p>
        </div>
      )}
    </>
  );
};

export default NoteCard;
