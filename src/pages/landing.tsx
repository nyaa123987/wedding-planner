'use client';

{/*



export default function LandingPage() {
  

  return (
    <main className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Ever After 💍</h1>
        <p className="text-gray-600 mb-6">Plan your dream wedding in one place.</p>
        <div className="space-x-4">
          
          
        </div>
      </div>
    </main>
  );
}
*/}

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import { motion } from "framer-motion";

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
    <div className="relative bg-white text-gray-800">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 bg-cover bg-bottom"
        style={{
          backgroundImage: "url('/images/landing-hero.jpg')"
        }}>
        <div className="absolute inset-0" />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-5xl md:text-6xl font-serif text-gray-900 max-w-3xl leading-tight"
        >
          Plan Your Perfect Wedding Day
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative z-10 mt-6 text-lg text-gray-600 max-w-xl"
        >
          Your love story deserves a celebration as beautiful as the journey itself. Let’s make it unforgettable.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="relative z-10 mt-8 space-x-4"
        >
          <button
            onClick={() => router.push('/signup')}
            className="px-4 py-2 bg-white text-black rounded border transition hover:bg-black hover:text-white hover:cursor-pointer active:opacity-[50%]"
          >
            Sign Up
          </button>
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black transition border hover:cursor-pointer active:opacity-[50%]"
          >
            Login
          </button>
        </motion.div>
      </section>

      {/* About */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/images/black-couple.jpeg"
              alt="Wedding couple"
              className="h-[70vh] rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-4xl font-serif mb-4 text-gray-900">
              Crafting Memories, One Detail at a Time
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We believe every wedding should reflect the couple’s unique personality and story.
              Our team takes care of every detail, so you can focus on what matters most — each other.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6 bg-pink-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-serif mb-12 text-gray-900">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Venue Selection", desc: "Find the perfect setting for your day." },
              { title: "Decoration & Styling", desc: "Elegant designs tailored to your theme." },
              { title: "Guest Management", desc: "We make sure everyone feels welcome." },
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-serif mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-4xl font-serif mb-6 text-gray-900">
          Let’s Begin Your Journey
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          From the first “yes” to the final “I do,” we’ll be with you every step of the way.
        </p>
        <button
          onClick={() => router.push('/signup')}
          className="px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black transition border hover:cursor-pointer active:opacity-[50%]"
        >
          Sign Up
        </button>
      </section>
    </div>
  );
}
