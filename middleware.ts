import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./libs/server/session";
import { catchError } from "./libs/error-handle";

const protectedRoute = ["/elearning"];
const publicRoute = ["/login"];

const safeMethods = ["GET", "HEAD", "OPTIONS"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const isProtectedRoute = protectedRoute.includes(path);
    const isPublicRoute = publicRoute.includes(path);
    
    const result = await verifyJwt();

    if (!result.success && isProtectedRoute) return NextResponse.redirect(new URL("/login", req.url));

    if (result.success && isPublicRoute) return NextResponse.redirect(new URL("/elearning", req.url));

    if (req.method === "GET") return NextResponse.next();
    
    if (safeMethods.includes(req.method)) return NextResponse.next();
    
	const originHeader = req.headers.get("Origin");
    const hostHeader = req.headers.get("Host") || req.headers.get("X-Forwarded-Host");
    
	if (originHeader === null || hostHeader === null) return new NextResponse(null, { status: 403 });

    // my own error handling function
    const [origin, error] = catchError(() => new URL(originHeader));
    if (error !== null || origin.host !== hostHeader) return new NextResponse(null, { status: 403 });

    return NextResponse.next();
}