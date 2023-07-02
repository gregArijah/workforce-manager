'use client';

import Link from "next/link";
import React, { useState } from 'react';
import LoginModal from './LoginModal'
import ContactModal from './ContactModal'

const styles = {
  background: {
    background: 'rgb(78, 115, 140)',
  }
};

export default function Navbar() {

  // function loginAlert() {
  //   // return alert(`a login form will appear here`)
  // }

  function contactAlert() {
    return alert(`a contact form will appear here, or maybe a links to our linkedin profiles`)
  }

  return (
    <nav className='text-right' style={styles.background}>
      <p className="p-2">
        <button className="cursor-pointer border border-slate-300  hover:bg-slate-700 rounded px-2 py-1 mx-2 outline-none">
        <LoginModal></LoginModal>
        </button>

        <button className='cursor-pointer border border-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'>
          <ContactModal></ContactModal>
        </button>
      </p>

{/* 
      <p>
        after successful login,
        <Link href="/punches" className='text-red-700'>
          this link
        </Link>
        should automatically be followed
      </p> */}

    </nav>
  )
}