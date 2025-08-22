import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '../lib/supabaseClient';
import { Guest } from '../types/guest';
import GuestItem from './GuestItem';
import AddGuestForm from './AddGuestForm';

const GuestList = () => {
  const { user } = useUser();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editGuest, setEditGuest] = useState<Guest | null>(null);

  // Fetch guests
  const fetchGuests = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .eq('user_id', user.id)
      .order('name', { ascending: true });

    if (error) {
      console.error(error);
    } else {
      setGuests(data);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, [user]);

  // Add or edit guest
  const handleSubmit = async (guest: Guest) => {
    if (!user) return;

    if (editGuest) {
      // Update guest
      const { error } = await supabase
        .from('guests')
        .update({ name: guest.name, email: guest.email })
        .eq('id', editGuest.id);

      if (error) {
        console.error(error);
      }
    } else {
      // Add new guest
      const { data, error } = await supabase
        .from('guests')
        .insert([{ ...guest, user_id: user.id }])
        .select()
        .single();

      if (error) {
        console.error(error);
      } else {
        setGuests((prev) => [...prev, data]);
      }
    }

    setShowForm(false);
    setEditGuest(null);
    fetchGuests();
  };

  // Remove guest
  const handleRemove = async (id: string) => {
    const { error } = await supabase.from('guests').delete().eq('id', id);
    if (error) console.error(error);
    else setGuests((prev) => prev.filter((g) => g.id !== id));
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
          onClose={() => { setShowForm(false); setEditGuest(null); }}
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
            onEdit={() => { setEditGuest(guest); setShowForm(true); }}
            onRemove={() => handleRemove(guest.id!)}
          />
        ))}
      </div>
    </div>
  );
};

export default GuestList;
