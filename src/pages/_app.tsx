import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const isLoggedIn = !!data.session;
      const isLanding = router.pathname === '/landing' || router.pathname === '/login' || router.pathname === '/signup';

      if (!isLoggedIn && !isLanding) {
        router.replace('/landing');
      }
    };

    checkSession();
  }, [router.pathname]);

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
