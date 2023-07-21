import { NextResponse }  from   'next/server'
import type { NextRequest } from 'next/server'
import { withAuth } from "next-auth/middleware"

// middleware is applied to all routes, use conditionals to select

export default withAuth(
  async function middleware (req) {
     const token = req.nextauth.token;
    
   
    if (req.nextUrl.pathname.startsWith('/admin') && token?.role!=="admin") {
              return NextResponse.redirect(new URL('/',req.url))
    }
    if (req.nextUrl.pathname.startsWith('/punches') && token?.role!=="employee") {
              return NextResponse.redirect(new URL('/admin',req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith('/admin') && !token) return false;
        if (req.nextUrl.pathname.startsWith('/punches') && !token) return false;
        return true;
      }
    }
  }
)
