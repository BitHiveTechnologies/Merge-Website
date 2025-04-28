import { BACKEND_URL } from '@/lib/utils';
import { NextResponse } from 'next/server';


// Fetch past workshops from your backend
export async function GET() {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/workshops/past`,
      { method: 'GET', cache: 'no-store' }
    );
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error fetching past workshops:', error);
    return NextResponse.json(
      { error: 'Failed to fetch past workshops' },
      { status: 500 }
    );
  }
}

// Proxy creation of a new past workshop to your backend
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(
      `${BACKEND_URL}/api/workshops/past`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error creating past workshop:', error);
    return NextResponse.json(
      { error: 'Failed to create past workshop' },
      { status: 500 }
    );
  }
}
