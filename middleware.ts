import { NextResponse }  from   'next/server'
import type { NextRequest } from 'next/server'
import { withAuth } from "next-auth/middleware"

// middleware is applied to all routes, use conditionals to select

export default withAuth(
  async function middleware (req) {

     const token = req.nextauth.token;
   
    if (req.nextUrl.pathname.startsWith('/admin') && token?.role!=="admin") {
              return NextResponse.redirect(new URL('/clock',req.url))
    }
    if (req.nextUrl.pathname.startsWith('/clock') && token?.role!=="employee") {
              return NextResponse.redirect(new URL('/admin',req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => !!token
      
    }
  }
)

export const config = { matcher: ["/admin/:path*", "/clock"] }