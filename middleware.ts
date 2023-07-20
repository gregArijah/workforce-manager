import { NextResponse }  from   'next/server'
import type { NextRequest } from 'next/server'
import { withAuth } from "next-auth/middleware"

// middleware is applied to all routes, use conditionals to select

export default withAuth(
  function middleware (req) {
    const token = req.nextauth.token;
   
    if (req.nextUrl.pathname.startsWith('/admin') && token?.role!=="admin") {
              return NextResponse.redirect(new URL('/punches',req.url))
    }
    if (req.nextUrl.pathname.startsWith('/punches') && token?.role!=="employee") {
              return NextResponse.redirect(new URL('/admin',req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        let role = token?.role || null;
        if (req.nextUrl.pathname.startsWith('/admin') && !token) return false;
        if (req.nextUrl.pathname.startsWith('/punches') && !token) return false;
        return true
      }
    }
  }
)
