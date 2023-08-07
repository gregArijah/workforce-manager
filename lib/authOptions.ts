import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
    
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Admin Credentials",
        type: "credentials",
        credentials: {
          name: { label: "Company", type: "text", defaultValue: "Company 1" },
          password: { label: "Password", type: "password", defaultValue: "company1adminpass" }
        },
        async authorize(credentials, req) {
  
          const { name, password } = credentials as { name: string; password: string;};
         
          const company = await prisma.company.findUnique({
            where: { name },
          })
  
          if (company && company.password == password){
            return { id: company.id,
                     name: company.name,
                     role: "employee",
            }
          }
          if (company && company.adminPassword == password){
            return { id: company.id,
                     name: company.name, 
                     role: "admin",
            }
          }
          return null;  
        }
      }),

      CredentialsProvider({
        id: "credentials_staff",
        name: "Staff Credentials",
        type: "credentials",
        credentials: {
          name: { label: "Company", type: "text", defaultValue: "Company 1" },
          password: { label: "Password", type: "password", defaultValue: "company1pass" }
        },
        async authorize(credentials, req) {
  
          const { name, password } = credentials as { name: string; password: string;};
         
          const company = await prisma.company.findUnique({
            where: { name },
          })
  
          if (company && company.password == password){
            return { id: company.id,
                     name: company.name,
                     role: "employee",
            }
          }
          if (company && company.adminPassword == password){
            return { id: company.id,
                     name: company.name, 
                     role: "admin",
            }
          }
          return null;  
        }
      })
  
    ],
    session: {
      strategy: "jwt",
    },

    callbacks: {
      async signIn({ user }) {
        return true;
      },
      async jwt({ token, user}) { 
        if (user) token = user as any;
        return token;
      },
      async session({ session, token }) { 
        session.user = token;
        return session;
      },      
      // async redirect({ url, baseUrl }) {
      //    return '/';
      // },
    }
  };
  