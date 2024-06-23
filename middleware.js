import { auth } from './app/_lib/auth';

export const middleware = auth;

// Matcher
export const config = {
  matcher: ['/account'],
};
