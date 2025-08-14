import { useUser } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { FileText, Bell, UserRound } from "lucide-react";
import Link from 'next/link';
import H1 from '../components/Heading1';

const Hero = () => {

  const user = useUser();
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const fetchWeddingDate = async () => {
      if (!user) return;

      const { data, error } = await supabase 
        .from('user_profiles')
        .select('wedding_date')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching wedding date:', error);
        return;
      }

      const today = new Date();
      const weddingDate = new Date(data.wedding_date);

      const timeDiff = weddingDate.getTime() - today.getTime();
      const days = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (days <= 0) {
        setIsPast(true);
      } else {
        setDaysLeft(days);
      }
    };

    fetchWeddingDate();
  }, [user]);

  return(
    <main
      className="w-full h-[100vh] flex flex-col justify-between"
      style={{
        background: "radial-gradient(circle, #EEEDDB 40%, #E3D3B9 100%)"
      }}
    >
      <div className="flex justify-between bg-[#E6D3C6] py-[2vh] px-[3%]">
        <H1>Ever After</H1>

        <div className="flex gap-8">
          <Link href="/reminders" aria-label="Notifications">
            <Bell className="w-6 h-6 hover:text-[#A47148] cursor-pointer" />
          </Link>

          <Link href="/notes" aria-label="Notifications">
            <FileText className="w-6 h-6 hover:text-[#A47148] cursor-pointer" />
          </Link>

          <Link href="/account" aria-label="Notifications">
            <UserRound className="w-6 h-6 hover:text-[#A47148] cursor-pointer" />
          </Link>
        </div>
      </div>

      <div className="w-3/4 h-5 mx-auto mt-12 md:my-6 rounded-3xl border-[#E4B441] border-2">
        <div className="bg-[#E4B441] border-[#E4B441] border-2 h-4 rounded-3xl" style={{ width: "70%" }}></div>
      </div>

      <div className="relative w-[100%] h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/hero-image.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          imageRendering: "auto",
        }}>
          <h1 className="tangerine text-5xl pb-[15vh] text-center">
            {isPast ? (
              'Congratulations! You are already married.'
            ) : daysLeft !== null ? (
              <>
                <span className="text-8xl">{daysLeft}</span>
                <br />
                days left
              </>
            ) : (
              'Loading...'
            )}
          </h1>    
      </div>
      
      <div className="flex justify-center cursor-pointer">
        <h1 className="tangerine text-3xl md:text-5xl text-center border-2 border-[#E4B441] p-2 shine-border-bg">Today's Task</h1>
      </div>

      <div className="flex justify-center align-middle gap-[5%] bg-[#E6D3C6] py-[2vh] mt-[5vh]">
        <Link href="/guests">Guests</Link>
        <Link href="/schedule">Schedule</Link>
        <Link href="/people">People</Link>
      </div>
      
    </main>
  )
}

export default Hero;