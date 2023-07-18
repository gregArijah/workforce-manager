
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest, response: NextResponse){
    const token = await getToken({ req: request })
    const role = token?.userRole;
    
    if (request.nextUrl.pathname.startsWith('/punches') && !token) {
        return NextResponse.redirect(new URL('/',request.url))	
    }
    if (request.nextUrl.pathname.startsWith('/admin') && role!=="admin") {
        return NextResponse.redirect(new URL('/',request.url))
    }



}
