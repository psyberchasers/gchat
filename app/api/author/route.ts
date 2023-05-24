import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
    return NextResponse.json({ author: 'Uri Charles' }, { status: 200 });
}
