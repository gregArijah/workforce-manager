import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const handler = NextAuth({
    
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

        if (!company || company.password !== password) return null;

        console.log(company);

        return { id: company.id, 
                 name: company.name, 
        }        
      }
    })

  ],

 
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },

});


export { handler as GET, handler as POST }