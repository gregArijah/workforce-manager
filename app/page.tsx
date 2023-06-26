import React, { useState } from 'react'
import prisma from './lib/prisma'
import Searchbar from './components/searchbar';
import ListAll from './components/listall';

export default async function Home() {
 

  return (
    <div className='h-screen'> 
      <nav className='text-right'>Navbar goes here: options for <span className='cursor-pointer text-red-700'>"login"</span> form and <span className='cursor-pointer text-red-700'>"contact"</span> form</nav>
      <br />
      <header className='text-left'>Header goes here: logo, name, and slogan</header>

        <p className="flex w-full justify-left border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl">
          NANJI - WORKFORCE MANAGER
        </p>  
        <div className = "flex justify-center items-center pt-32">
          Cool background image goes here
        </div>
       
    
    </div>
  )
}
