import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Guest } from '../types/guest';
import GuestItem from './GuestItem';
import AddGuestForm from './AddGuestForm';

const GuestList = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editGuest, setEditGuest] = useState<Guest | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUserId(data.user?.id ?? null);
      }
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchGuests = async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .eq('user_id', userId)
      .order('name', { ascending: true });

    if (error) {
      console.error(error);
    } else {
      setGuests(data || []);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, [userId]);

  const handleSubmit = async (guest: Guest) => {
    if (!userId) return;

    if (editGuest) {
      const { error } = await supabase
        .from('guests')
        .update({ name: guest.name, email: guest.email })
        .eq('id', editGuest.id);

      if (error) {
        console.error(error);
      }
    } else {
      const { data, error } = await supabase
        .from('guests')
        .insert([{ ...guest, user_id: userId }])
        .select()
        .single();

      if (error) {
        console.error(error);
      } else if (data) {
        setGuests((prev) => [...prev, data]);
      }
    }

    setShowForm(false);
    setEditGuest(null);
    fetchGuests();
  };

  const handleRemove = async (id: string) => {
    const { error } = await supabase.from('guests').delete().eq('id', id);
    if (error) {
      console.error(error);
    } else {
      setGuests((prev) => prev.filter((g) => g.id !== id));
    }
  };

  return (
    <div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowForm(true)}
      >
        Add Guest
      </button>

      {showForm && (
        <AddGuestForm
          onClose={() => {
            setShowForm(false);
            setEditGuest(null);
          }}
          onSubmit={handleSubmit}
          isEditMode={!!editGuest}
          initialGuest={editGuest || undefined}
        />
      )}

      <div>
        {guests.map((guest) => (
          <GuestItem
            key={guest.id}
            guest={guest}
            onEdit={() => {
              setEditGuest(guest);
              setShowForm(true);
            }}
            onRemove={() => handleRemove(guest.id!)}
          />
        ))}
      </div>
    </div>
  );
};

export default GuestList;
