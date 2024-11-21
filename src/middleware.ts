import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    // Vérifier le token de session directement depuis les cookies
    const token = request.cookies.get('next-auth.session-token')?.value

    // Liste des chemins publics qui ne nécessitent pas d'authentification
    const publicPaths = ['/login', '/register', '/', '/api/auth']
    const isPublicPath = publicPaths.some(path =>
        request.nextUrl.pathname.startsWith(path)
    )

    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}