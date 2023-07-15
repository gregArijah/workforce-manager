import { getServerSession } from "next-auth/next" 
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

import Header from "../_components/header"

// Define the type for the session object
interface Session {
    user: {
      name: string;
      sub: string;
      userRole: string;
      iat: number;
      exp: number;
      jti: string;
    };
  }
export default async function AdminLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const session:Session|null = await getServerSession(authOptions);
    
    const role = session?.user?.userRole;
    
    if (!session)  {
      console.log("no session");
      redirect("/");
    }
    if (role !== "admin")  {	
      console.log("not admin");
      redirect("/");
    }
    return (
        <section>
            {children}
        </section>
    )
  }