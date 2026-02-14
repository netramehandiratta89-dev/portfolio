import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { origin } = new URL(request.url)
  // Redirect to home page as auth is temporarily disabled
  return NextResponse.redirect(origin)
}
