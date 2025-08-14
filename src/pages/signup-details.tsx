'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import axios from 'axios';
import Image from "next/image";

export default function SignUpStepTwo() {
  const router = useRouter();

  const [age, setAge] = useState<number | undefined>();
  const [gender, setGender] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [wedding_date, setWeddingDate] = useState<string>('');
  const [budget, setBudget] = useState<number | undefined>();

  const [error, setError] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.id) {
        setUserId(data.user.id);
      } else {
        setError('User not authenticated. Please log in again.');
      }
    };

    fetchUser();
  }, []);

  const submitUserDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!userId) {
      setError('User ID not found.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/add-profile', {
        user_id: userId,
        age,
        gender,
        city,
        wedding_date,
        budget,
      });

      console.log('Profile created:', response.data);
      router.push('/');
    } catch (err: unknown) {
      // Type-safe error handling
      if (axios.isAxiosError(err)) {
        console.error('Axios error:', err.response?.data);
        setError(err.response?.data?.detail || 'Failed to create profile');
      } else if (err instanceof Error) {
        console.error('Error:', err.message);
        setError(err.message);
      } else {
        console.error('Unknown error:', err);
        setError('Failed to create profile');
      }
    }
  };

  return (
    <section className='w-full md:h-screen px-[3%] flex items-center justify-center'>
      <div className='flex flex-col-reverse md:flex-row w-full max-w-6xl items-center justify-between'>
        <div className='w-full md:w-1/3 h-[50vh] md:h-[100vh] relative'>
          <Image 
            src="/images/bouquet.png"
            alt="Background image"
            fill
            style={{ objectFit: "contain", objectPosition: "center " }}
          />
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <form onSubmit={submitUserDetails} className="bg-transparent p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
            <h2 className="text-2xl font-bold text-center text-black mb-[5vh]">More About You</h2>

            <input
              type="number"
              placeholder="Age"
              value={age || ''}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full p-2 border rounded"
              required
            />

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="bride">Bride</option>
              <option value="groom">Groom</option>
            </select>

            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />

            <input
              type="date"
              value={wedding_date}
              onChange={(e) => setWeddingDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />

            <input
              type="number"
              placeholder="Budget"
              value={budget || ''}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full p-2 border rounded"
              required
            />

            <button type="submit" className="transition w-full bg-black text-white p-2 rounded hover:bg-white hover:text-black shadow-md focus:outline-none focus:ring-2 focus:ring-[#CCCCCC] hover:cursor-pointer">
              Finish
            </button>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
