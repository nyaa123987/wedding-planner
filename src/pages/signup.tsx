// pages/signup.tsx
'use client';
import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';

export default function SignUpPage() {
  const router = useRouter();

  useEffect(() => {
  const checkSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      // Optional: Check if profile exists and redirect accordingly
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', data.session.user.id)
        .single();

      if (profile) {
        router.replace('/');
      } else {
        router.replace('/signup-details');
      }
    }
  };

  checkSession();
}, []);


  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    const userId = data.user?.id;

    if (!userId) {
      setError('Failed to retrieve user ID.');
      return;
    }

    // Redirect to signup-details page with userId
    router.push(`/signup-details?userId=${userId}`);
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-pink-600">Create an Account</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button type="submit" className="w-full bg-pink-600 text-white p-2 rounded hover:bg-pink-700">
          Continue
        </button>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
      </form>
    </div>
  );
}
