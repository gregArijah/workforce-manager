
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'


export async function middleware(request: NextRequest, response: NextResponse){
    const token = await getToken({ req: request })
    const role = await token?.role;
    
    
    if (request.nextUrl.pathname.startsWith('/punches') && !token) {
        return NextResponse.redirect(new URL('/',request.url))	
    }
    if (request.nextUrl.pathname.startsWith('/admin') && role!=="admin") {
        console.log("ROLE$$$$: ", role)
        return NextResponse.redirect(new URL('/punches',request.url))
    }
}
