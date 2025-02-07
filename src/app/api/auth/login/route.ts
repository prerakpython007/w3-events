import { cookies } from 'next/headers';

export async function POST() {
  const sessionId = crypto.randomUUID();
  (await cookies()).set('sessionId', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 // 24 hours
  });
  
  return new Response(null, { status: 200 });
}