'use client';
import Link from "next/link";
import SessionInfo from "@/app/session";

export default function Navbar() {

  const {session, loading} = SessionInfo();

  return (  
        <nav className='text-right'>
            {session && <Link href='/api/auth/signout'><button className='bg-blue-600 h-8 w-24 rounded'>Logout</button></Link>}
            {loading && <button className='bg-blue-600 h-8 w-24 rounded'>Verifying...</button>}
            {!session && !loading && <Link href='/api/auth/signin'><button className='bg-blue-600 h-8 w-24 rounded'>Login</button></Link>}
        </nav>

    )
}

