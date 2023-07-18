import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/lib/prisma";

let role:string;

export const authOptions: NextAuthOptions = {
    
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        name: { label: "Company", type: "text", placeholder: "demo-name" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        const { name, password } = credentials as { name: string; password: string;};
       
        const company = await prisma.company.findUnique({
          where: { name },
        })

        if (company && company.password == password){
          role = "employee";
          return { id: company.id, 
                   name: company.name, 
          }
        }

        if (company && company.adminPassword == password){
          role = "admin";
          return { id: company.id,
                    name: company.name,
          }
        }

        return null;
           
      }
    })

  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = role;
      }
      return token;
    },
    async session({ session, token }) {
        //console.log(session)
        console.log(token)
        session.user = token;
        return session;
    },
    
    async redirect({ url, baseUrl }) {
       return "/admin";
    }
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }