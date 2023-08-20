'use client'

import React from 'react';
import HeaderSection from './header';
import { useRouter } from 'next/navigation';

function HeroSection({session} : {session: any}) {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-screen">
      <HeaderSection session={session} />

      <div className="flex flex-col text-white text-center items-center justify-center h-screen">
        <h1 className="text-6xl font-bold mb-4">Welcome to Veleron</h1>
        <p className="text-2xl mb-8">Attendance and time tracking simplified.</p>
        <button onClick={()=>router.push('/register')} className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-6 py-3 rounded-full">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
