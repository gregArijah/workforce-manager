
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
// interface Session {
//   user: {
//     name: string;
//     sub: string;
//     userRole: string;
//     iat: number;
//     exp: number;
//     jti: string;
//   };
// }


export async function middleware(request: NextRequest, response: NextResponse){
    const token = await getToken({ req: request })
    console.log("middleware: token",token?.userRole);
    console.log("middleware: token2222", JSON.stringify(token));
    
    const cookies :String|null = request.headers.get('cookie') ;
    
    if (request.nextUrl.pathname.startsWith('/punches')) {
        console.log("middleware: punches",cookies);	
    }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  }

}
