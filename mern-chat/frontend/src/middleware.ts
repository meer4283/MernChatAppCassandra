import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { JwtPayload, jwtDecode } from 'jwt-decode'
 

const protectedRoutes:Array<string> = ['/chat'];

const publicRoutes = ['/login', '/register']
 
export default async function middleware(req: NextRequest) {

  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
  const currentTime = Math.floor(Date.now() / 1000);

  const accessToken = cookies().get('accessToken')?.value ||  "";

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute &&  accessToken ==="" ) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
  if( accessToken !== ""){
    const decoded: any = jwtDecode<JwtPayload>(accessToken);
    const validLoggedIn = decoded.aud && decoded.jti && decoded.iat && decoded.nbf && decoded.exp && decoded.sub && decoded.exp > currentTime;
    if (isPublicRoute && validLoggedIn ) {
      return NextResponse.redirect(new URL('/chat', req.nextUrl))
    }
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}