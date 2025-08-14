'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
  const checkUserState = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData.session;

    if (session) {
      const user = session.user;

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        router.replace('/');
      } else {
        router.replace('/signup-details');
      }
    }
  };

  checkUserState();
}, [router]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Ever After 💍</h1>
        <p className="text-gray-600 mb-6">Plan your dream wedding in one place.</p>
        <div className="space-x-4">
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/signup')}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Sign Up
          </button>
        </div>
      </div>
    </main>
  );
}
