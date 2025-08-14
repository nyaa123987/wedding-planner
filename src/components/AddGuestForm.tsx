import { useState, useEffect } from 'react';
import { Guest } from '../../types/guest';

type AddGuestFormProps = {
  onClose: () => void;
  onSubmit: (guest: Guest) => void;
  isEditMode?: boolean;
  initialGuest?: Guest;
};

const AddGuestForm = ({ onClose, onSubmit, isEditMode = false, initialGuest }: AddGuestFormProps) => {
  const [name, setName] = useState(initialGuest?.name || '');
  const [email, setEmail] = useState(initialGuest?.email || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialGuest) {
      setName(initialGuest.name);
      setEmail(initialGuest.email ?? '');
    }
  }, [initialGuest]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email });
    
    if (!name.trim()) {
      setError('Please enter at least the name of the guest.');
      return;
    }
    onSubmit({ name: name.trim(), email: email.trim() || undefined });
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-80 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-black text-xl">×</button>
        <h2 className="text-xl font-semibold mb-4">{isEditMode ? 'Edit Guest' : 'Add New Guest'}</h2>
        <input
          type="text"
          placeholder="Guest Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full p-2 mb-2 rounded"
        />
        <input
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 mb-2 rounded"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded w-full">
          {isEditMode ? 'Save' : 'Add'}
        </button>
      </div>
    </div>
  );
};

export default AddGuestForm;
