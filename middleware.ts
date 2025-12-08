import { type NextRequest, NextResponse } from "next/server"
import { COOKIES } from "./constants"

export async function middleware(request: NextRequest) {
    const cookieStore = request.cookies
    const isAuthed = cookieStore.has(COOKIES.Session)

    if (!isAuthed && request.nextUrl.pathname === "/") return NextResponse.next()

    if (!isAuthed && !request.nextUrl.pathname.startsWith("/auth")) {
        const returnTo = encodeURIComponent(request.nextUrl.pathname + request.nextUrl.search)
        return NextResponse.redirect(new URL(`/auth/login?returnTo=${returnTo}`, request.url))
    }

    if (isAuthed && request.nextUrl.pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/profile", "/auth/:path*", "/", "/dashboard", "/pages:path*"],
}
