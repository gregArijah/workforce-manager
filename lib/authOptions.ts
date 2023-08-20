import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const saltRounds = 10;	


export const authOptions: NextAuthOptions = {
    
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Admin Credentials",
        type: "credentials",
        credentials: {
          name: { label: "Company", type: "text", defaultValue: "Demo Account" },
          password: { label: "Password", type: "password", defaultValue: "adminpassword" }
        },
        async authorize(credentials, req) {
  
          const { name, password } = credentials as { name: string; password: string;};
         
          const company = await prisma.company.findUnique({
            where: { name },
          })
          if (!company) return null;

          const validAdmin = await bcrypt.compare(password, company.adminPassword);
          const validEmployee = await bcrypt.compare(password, company.password);
          console.log("validAdmin", validAdmin, "validEmployee",  validEmployee);
          //if (company.password == password){
          if (validEmployee){
            return { id: company.id,
                     name: company.name,
                     role: "employee",
            }
          }
          //if (company.adminPassword == password){
          if (validAdmin){
            return { id: company.id,
                     name: company.name, 
                     role: "admin",
            }
          }
          return null;  
        }
      }),

      CredentialsProvider({
        id: "credentials2",
        name: "Staff Credentials",
        type: "credentials",
        credentials: {
          name: { label: "Company", type: "text", defaultValue: "Demo Account" },
          password: { label: "Password", type: "password", defaultValue: "staffpassword" }
        },
        async authorize(credentials, req) {
  
          const { name, password } = credentials as { name: string; password: string;};
         
          const company = await prisma.company.findUnique({
            where: { name },
          })
          if (!company) return null;

          const validAdmin = await bcrypt.compare(password, company.adminPassword);
          const validEmployee = await bcrypt.compare(password, company.password);
          console.log("validAdmin", validAdmin, "validEmployee",  validEmployee);
          //if (company.password == password){
          if (validEmployee){
            return { id: company.id,
                     name: company.name,
                     role: "employee",
            }
          }
          //if (company.adminPassword == password){
          if (validAdmin){
            return { id: company.id,
                     name: company.name, 
                     role: "admin",
            }
          }
          return null;  
        }
      }),

      
  
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
  