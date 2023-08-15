'use client'

import SessionInfo from "@/app/utils/clientSession";
import { signIn, signOut } from "next-auth/react";

const login = () => {signIn(undefined,{ callbackUrl:'/admin'})}
const logout = () => {signOut({callbackUrl:'/'})}

export default function Navbar() {

  const {session, loading} = SessionInfo();
  
  return (  
        <nav className='text-right'>
            {session && <button onClick={logout} className='bg-blue-600 h-8 w-24 rounded'>Logout</button>}
            {loading && <button className='bg-blue-600 h-8 w-24 rounded'>Verifying...</button>}
            {!session && !loading && <button onClick={login} className='bg-blue-600 h-8 w-24 rounded'>Login</button>}
        </nav>
    )
}

