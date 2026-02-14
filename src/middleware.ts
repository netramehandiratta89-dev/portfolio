import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Middleware logic is temporarily removed to resolve a build issue.
  return NextResponse.next()
}

export const config = {
  // Matcher is cleared to prevent middleware from running.
  matcher: [],
}
