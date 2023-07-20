
import { NextResponse }  from   'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest, response: NextResponse){
    
    const token = await getToken({ req: request })
    const role = token?.role;
    console.log("ROLE in MIDLEWARE: ", role)
    
    if (request.nextUrl.pathname.startsWith('/punches') && !token) {
        console.log("ROLE in MIDLEWARE$$$$: ", role)
        return NextResponse.redirect(new URL('/',request.url))	
    }
    if (request.nextUrl.pathname.startsWith('/admin') && role!=="admin") {
        console.log("ROLE in MIDLEWARE$$$$: ", role)
        return NextResponse.redirect(new URL('/punches',request.url))
    }
    
    //return NextResponse.next()
}
