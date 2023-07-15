import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
        token.userRole = role;
      }
      return token;
    },
    async session({ session, token, user }) {
        session.user = token;
        return session;
    },
    async redirect({ url, baseUrl }) {
      
      url = role === "admin" ? "/admin" : "/punches";
      return url;
    }
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }