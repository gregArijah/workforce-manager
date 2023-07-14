'use client';

import Link from "next/link";


export default function Navbar() {
 
  return (
      <nav className='text-right'>
        <Link href='/api/auth/signin'><button className='bg-blue-600 h-8 w-24 rounded'>Login</button></Link>           
      </nav>
    )
}