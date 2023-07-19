// import { getServerSession } from "next-auth/next" 
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"
// import { redirect } from "next/navigation"

// import Header from "../_components/header"

// // Define the type for the session object
// interface Session {
//     user: {
//       name: string;
//       sub: string;
//       userRole: string;
//       iat: number;
//       exp: number;
//       jti: string;
//     };
//   }
export default async function PunchesLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    // const session:Session|null = await getServerSession(authOptions);
    
    // if (!session)  {
    //   console.log("no session, re-directing");
    //   redirect("/");
    // }
   
    return (
        <section>
            {children}
        </section>
    )
  }
