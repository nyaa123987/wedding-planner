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
  return (
    <div className="bg-white rounded-md shadow-md p-4 cursor-pointer w-48 h-64 overflow-hidden hover:shadow-lg transition">
      <h2 className="text-lg font-semibold truncate">{note.title}</h2>
      <p className="text-xs text-gray-500 absolute bottom-2 left-2 right-2 truncate">
        {new Date(note.created_at).toLocaleString()}
      </p>
    </div>
  );
};

export default NoteCard;
