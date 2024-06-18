import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRouts = createRouteMatcher([
  '/',
  '/upcoming',
  '/previous',
  '/personal-room',
  '/meeting(.*)'
])

export default clerkMiddleware((auth, req) => {
  if(protectedRouts(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
