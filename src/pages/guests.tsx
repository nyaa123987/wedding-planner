import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import H1 from '../components/Heading1';
import AddGuestForm from '../components/AddGuestForm';
import GuestItem from '../components/GuestItem';
import Toast from '../components/Toast';
import { Guest } from '../types/guest';
import { supabase } from '../lib/supabaseClient';

const Guests = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editGuest, setEditGuest] = useState<Guest | null>(null);
  const [toast, setToast] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) console.error('Error fetching user:', error.message);
      if (user) setUserId(user.id);
    };

    getUser();
  }, []);

  const fetchGuests = useCallback(async () => {
    if (!userId) return;

    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (data) setGuests(data);
    if (error) console.error('Fetch guests error:', error.message);
  }, [userId]);

  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  const handleAddGuest = async (guest: Guest) => {
    if (!userId) return;

    const { error } = await supabase.from('guests').insert([
      {
        ...guest,
        user_id: userId,
      },
    ]);

    if (!error) {
      setToast('Guest added!');
      fetchGuests();
    }

    setShowForm(false);
    setTimeout(() => setToast(''), 3000);
  };

  const handleEditGuest = async (guest: Guest) => {
    if (!guest.id) return;

    const { error } = await supabase
      .from('guests')
      .update({
        name: guest.name,
        email: guest.email,
      })
      .eq('id', guest.id);

    if (!error) {
      setToast('Guest updated!');
      fetchGuests();
    }

    setEditGuest(null);
    setShowForm(false);
    setTimeout(() => setToast(''), 3000);
  };

  const handleRemoveGuest = async (id: string) => {
    const { error } = await supabase.from('guests').delete().eq('id', id);

    if (!error) {
      setToast('Guest removed!');
      fetchGuests();
    }

    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="py-8 relative px-[2%]">
      <div className="flex justify-between items-center mb-10">
        <Link href="/">
          <ArrowLeft className="w-6 h-6 cursor-pointer" />
        </Link>
        <H1>Guest List</H1>
        <button
          onClick={() => {
            setEditGuest(null);
            setShowForm(true);
          }}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Add Guest
        </button>
      </div>

      <div>
        {guests.map((guest) => (
          <GuestItem
            key={guest.id}
            guest={guest}
            onRemove={() => handleRemoveGuest(guest.id!)}
            onEdit={() => {
              setEditGuest(guest);
              setShowForm(true);
            }}
          />
        ))}
      </div>

      {showForm && (
        <AddGuestForm
          onClose={() => {
            setShowForm(false);
            setEditGuest(null);
          }}
          onSubmit={editGuest ? handleEditGuest : handleAddGuest}
          isEditMode={!!editGuest}
          initialGuest={editGuest || undefined}
        />
      )}

      {toast && <Toast message={toast} />}
    </div>
  );
};

export default Guests;
