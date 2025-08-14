import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const isLoggedIn = !!data.session;
      const isLanding = pathname === '/landing' || pathname === '/login' || pathname === '/signup';

      if (!isLoggedIn && !isLanding) {
        router.replace('/landing');
      }
    };

    checkSession();
  }, [pathname, router]);

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
