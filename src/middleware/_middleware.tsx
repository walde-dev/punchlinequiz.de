//if private mode is disabled in env, show qui
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { env } from "~/env.mjs";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //if private mode is enabled in env, redirect to code page
  if (env.PRIVATE_MODE === "true") {
    return NextResponse.redirect(new URL("/code"));
  }

  return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/about/:path*",
};
