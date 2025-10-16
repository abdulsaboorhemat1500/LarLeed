// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Define ALL protected routes from your images
  const protectedRoutes = [
    '/applying-for-sch-cp',
    '/contact-us-cp',
    '/dashboard',
    '/featured-videos-cp',
    '/get-in-touch-cp',
    '/mentors-tmembers-cp',
    '/posts-cp',
    '/scholarships-programs-cp',
    '/user-list',
    '/details-cp',
    '/add',
    '/update',
    '/[id]',
    '/add-mentor-tmember-cp',
    '/add-post-cp',
    '/add-scholarships-program-cp',
    '/add-user',
    '/update-user'
  ]

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )

  // Get the token from cookies
  const token = request.cookies.get('auth-token')

  // If accessing protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/applying-for-sch-cp/:path*',
    '/contact-us-cp/:path*',
    '/dashboard/:path*',
    '/featured-videos-cp/:path*',
    '/get-in-touch-cp/:path*',
    '/mentors-tmembers-cp/:path*',
    '/posts-cp/:path*',
    '/scholarships-programs-cp/:path*',
    '/user-list/:path*',
    '/details-cp/:path*',
    '/add/:path*',
    '/update/:path*',
    '/[id]/:path*',
    '/add-mentor-tmember-cp/:path*',
    '/add-post-cp/:path*',
    '/add-scholarships-program-cp/:path*',
    '/add-user/:path*',
    '/update-user/:path*'
  ]
}