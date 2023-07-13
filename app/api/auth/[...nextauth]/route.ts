import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
    
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        company: { label: "Company", type: "text", placeholder: "demo-name" },
        password: { label: "Password", type: "password" }
      },
      authorize(credentials, req) {
        const { company, password } = credentials as { company: string; password: string;};
        // perform you login logic
        // find out user from db
        if (company !== "john@gmail.com" || password !== "1234") {
          throw new Error("invalid credentials");
        }

        // if everything is fine
        return {
          id: "1234",
          name: "John Doe",
          email: "john@gmail.com",
          role: "admin",
        } ;
      },
    }),
  ],

  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check email message)
  //   newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
  
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },

});


export { handler as GET, handler as POST }