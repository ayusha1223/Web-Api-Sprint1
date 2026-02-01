import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // ❌ Do NOT check auth here
  // Middleware should NOT handle localStorage-based auth
  return NextResponse.next();
}
