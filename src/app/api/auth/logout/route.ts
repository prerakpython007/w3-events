import { cookies } from 'next/headers';

export async function POST() {
  (await cookies()).delete('sessionId');
  return new Response(null, { status: 200 });
}