'use client'

import Link from "next/link";
//import { useContext } from "react";
//import AuthContext from "../../../AuthContext"
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status  } = useSession();
  const loading = status === "loading";

  console.log("status",status,"session", session);
  
  
  return (
      //<AuthContext>
        <nav className='text-right'>
                    
          {session && <Link href='/api/auth/signout'><button className='bg-blue-600 h-8 w-24 rounded'>Logout</button></Link>}
          {!session && loading &&<button className='bg-blue-600 h-8 w-24 rounded'>Checking...</button>}
          {!session && !loading && <Link href='/api/auth/signin'><button className='bg-blue-600 h-8 w-24 rounded'>Login</button></Link>}

        </nav>
 //     </AuthContext>
    )
}