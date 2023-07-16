import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Navbar() {

  const session = await getServerSession(authOptions);

  return (  
        <nav className='text-right'>
            {session && <Link href='/api/auth/signout'><button className='bg-blue-600 h-8 w-24 rounded'>Logout</button></Link>}
            {!session && <Link href='/api/auth/signin'><button className='bg-blue-600 h-8 w-24 rounded'>Login</button></Link>}
        </nav>

    )
}