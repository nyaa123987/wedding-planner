import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import NoteCard from "../components/NoteCard";
import { Plus, ArrowLeft } from "lucide-react";
import H1 from "../components/Heading1";

type Note = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
};

const NotesPage = () => {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    if (!userId) return;

    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setNotes(data as Note[]);
    } else {
      console.error("Error fetching notes:", error);
    }
  }, [userId]);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.push("/auth");
        return;
      }
      setUserId(data.user.id);
    };
    getUser();
  }, [router]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleAddNote = () => {
    router.push("/create-note");
  };

  return (
    <div className="relative p-8 min-h-screen bg-white">
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-200"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <H1>My Notes</H1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>

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
