import { cookies } from 'next/headers';

export async function GET() {
  const sessionId = (await cookies()).get('sessionId');
  return new Response(null, { 
    status: sessionId ? 200 : 401 
  });
}