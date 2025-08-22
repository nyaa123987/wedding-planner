import { useEffect, useState } from 'react';
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";
import Link from 'next/link';

const Hero = () => {
  const router = useRouter();
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const fetchWeddingDate = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push("/auth");
        return;
      }
      try {
        const res = await fetch('/api/profile');
        const data = await res.json();

        if (!data?.wedding_date) return;

        const today = new Date();
        const weddingDate = new Date(data.wedding_date);

        const timeDiff = weddingDate.getTime() - today.getTime();
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (days <= 0) {
          setIsPast(true);
        } else {
          setDaysLeft(days);
        }
      } catch (error) {
        console.error("Error fetching wedding date:", error);
      }
    };

    fetchWeddingDate();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <main
      className="w-full h-[100vh] flex flex-col justify-between"
      style={{
        background: "radial-gradient(circle, #EEEDDB 40%, #E3D3B9 100%)"
      }}
    >
      
      <div className="flex justify-between bg-[#E6D3C6] py-[2vh] px-[3%]">
        <h1 className="tangerine text-4xl text-center">Ever After</h1>
        <div className="flex gap-8">
          <Link href="/notes" className="bg-gray-500 text-white text-sm px-2 rounded hover:bg-gray-600 transition shadow-md inline-flex items-center justify-center">
              Notes
          </Link>
          <button
            onClick={handleLogout}
            className="bg-[#B85042] text-white text-sm px-2 rounded hover:bg-[#A03F37] transition shadow-md"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="w-3/4 h-5 mx-auto mt-12 md:my-6 rounded-3xl border-[#E4B441] border-2">
        <div className="bg-[#E4B441] border-[#E4B441] border-2 h-4 rounded-3xl" style={{ width: "70%" }}></div>
      </div>

      <div
        className="relative w-[100%] h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/hero-image.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          imageRendering: "auto",
        }}
      >
        <h1 className="tangerine text-5xl pb-[15vh] text-center">
          {isPast ? (
            "Congratulations! You are already married."
          ) : daysLeft !== null ? (
            <>
              <span className="text-8xl">{daysLeft}</span>
              <br />
              days left
            </>
          ) : (
            "Loading..."
          )}
        </h1>
      </div>

      <div className="flex justify-center cursor-pointer">
        <h1 className="tangerine text-3xl md:text-5xl text-center border-2 border-[#E4B441] p-2 shine-border-bg">
          Today&apos;s Task
        </h1>
      </div>

      <div className="flex justify-center align-middle gap-[5%] bg-[#E6D3C6] py-[2vh] mt-[5vh]">
        <Link href="/guests">Guests</Link>
        <Link href="/schedule">Schedule</Link>
        <Link href="/vendors">Vendors</Link>
      </div>
    </main>
  );
};

export default Hero;
